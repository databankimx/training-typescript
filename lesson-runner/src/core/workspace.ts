import { cp, readdir, rm, writeFile } from "node:fs/promises";
import { rmSync } from "node:fs";
import { join } from "node:path";

// Run and Check work on a copy of the step in .runner-work, inside the repository and ignored by git. The lesson
// files are never changed. The folder is removed when the runner closes.

export const WORK_FOLDER = ".runner-work";

const SAFE_SEGMENT = /^[A-Za-z0-9._-]+$/;

// Turns a lesson id ("ch01-getting-started/01-hello-world", or "ch02-x/homework/01-y") into a folder under the work
// folder. Each part must be a plain folder name, so an id can't climb out of the work folder.
export function workspaceFolder(courseRoot: string, id: string): string {
  const segments = id.split("/");
  for (const segment of segments) {
    if (segment === "." || segment === ".." || !SAFE_SEGMENT.test(segment)) {
      throw new Error(`"${id}" is not a valid lesson id`);
    }
  }
  return join(courseRoot, WORK_FOLDER, ...segments);
}

// The kinds of file a learner edits in a step: TypeScript, and the page's HTML and CSS.
const CODE_EXTENSIONS = [".ts", ".html", ".css"];

// The code files of a lesson step: main.ts first, then the others by name. The reference solution is never one of them.
export async function listCodeFiles(stepPath: string): Promise<string[]> {
  const names = (await readdir(stepPath, { withFileTypes: true }))
    .filter((entry) => entry.isFile() && CODE_EXTENSIONS.some((ext) => entry.name.endsWith(ext)) && entry.name !== "solution.ts")
    .map((entry) => entry.name);
  return names.sort((a, b) => (a === "main.ts" ? -1 : b === "main.ts" ? 1 : a.localeCompare(b)));
}

// Copies a step's code files into its work folder, then writes the text the learner has in the editor for each file.
// Lesson text and the reference solution are left out, so only the learner's files are there.
export async function prepareWorkspace(
  courseRoot: string,
  id: string,
  stepPath: string,
  files: Record<string, string>,
): Promise<string> {
  const destination = workspaceFolder(courseRoot, id);
  await rm(destination, { recursive: true, force: true });
  await cp(stepPath, destination, {
    recursive: true,
    filter: (source) => !source.endsWith(".md") && !source.endsWith("lesson.json") && !source.endsWith("solution.ts"),
  });
  for (const [name, text] of Object.entries(files)) {
    await writeFile(join(destination, name), text, "utf8");
  }
  return join(destination, "main.ts");
}

// Removes the whole work folder. Used when the runner closes, so no copies are left behind.
export function cleanWorkspaceSync(courseRoot: string): void {
  rmSync(join(courseRoot, WORK_FOLDER), { recursive: true, force: true });
}
