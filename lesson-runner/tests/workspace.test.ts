import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { listCodeFiles, prepareWorkspace, WORK_FOLDER } from "../src/core/workspace.ts";

// A step folder with a main file, a helper module, the lesson text, and the reference solution.
async function makeStep(): Promise<{ root: string; step: string }> {
  const root = await mkdtemp(join(tmpdir(), "ts-workspace-"));
  const step = join(root, "part-i-test", "ch01-test", "01-step");
  await mkdir(step, { recursive: true });
  await writeFile(join(step, "main.ts"), "import { x } from './helper.ts';", "utf8");
  await writeFile(join(step, "helper.ts"), "export const x = 1;", "utf8");
  await writeFile(join(step, "solution.ts"), "// the answer", "utf8");
  await writeFile(join(step, "lesson.md"), "# Lesson", "utf8");
  await writeFile(join(step, "lesson.json"), "{}", "utf8");
  return { root, step };
}

test("lists the code files with main.ts first, leaving out the solution and the lesson text", async () => {
  const { root, step } = await makeStep();
  try {
    assert.deepEqual(await listCodeFiles(step), ["main.ts", "helper.ts"]);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("lists the page's HTML and CSS alongside the TypeScript, with main.ts first", async () => {
  const { root, step } = await makeStep();
  try {
    await writeFile(join(step, "index.html"), "<!doctype html>", "utf8");
    await writeFile(join(step, "style.css"), "body {}", "utf8");
    assert.deepEqual(await listCodeFiles(step), ["main.ts", "helper.ts", "index.html", "style.css"]);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("writes the learner's text for every file, so a helper's edits are used by Run", async () => {
  const { root, step } = await makeStep();
  try {
    const mainFile = await prepareWorkspace(root, "ch01-test/01-step", step, {
      "main.ts": "import { x } from './helper.ts'; console.log(x);",
      "helper.ts": "export const x = 42;",
    });
    assert.equal(await readFile(mainFile, "utf8"), "import { x } from './helper.ts'; console.log(x);");
    const helper = await readFile(join(root, WORK_FOLDER, "ch01-test", "01-step", "helper.ts"), "utf8");
    assert.equal(helper, "export const x = 42;");
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("the work folder never contains the reference solution", async () => {
  const { root, step } = await makeStep();
  try {
    await prepareWorkspace(root, "ch01-test/01-step", step, { "main.ts": "", "helper.ts": "" });
    await assert.rejects(readFile(join(root, WORK_FOLDER, "ch01-test", "01-step", "solution.ts"), "utf8"));
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});
