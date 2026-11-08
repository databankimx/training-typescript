import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";

// The runner's course catalog, following the JavaScript course's layout:
//
//   part-i-foundations/                   a part: a folder named part-<roman>-<words>
//     ch01-getting-started/               a chapter: a folder named ch<NN>-<words>
//       lesson.md                         the chapter's introduction (optional)
//       01-setup/                         a step: a folder named <NN>-<words>, with a lesson.json
//       04-homework/                      a homework step: its exercises are folders inside it
//         01-find-the-mistake/            an exercise: a folder with a lesson.json
//
// Folders that don't match these names, and steps with no lesson.json, are ignored.

export interface LessonMeta {
  title: string;
  runtime: "node";
  minutes: number;
  objective: string;
  prerequisites: string[];
  expected?: string;
  verify: string[];
}

export interface Lesson {
  chapter: string;
  step: string;
  path: string;
  homework: boolean;
  meta: LessonMeta;
}

export interface Chapter {
  name: string;
  path: string;
  lessons: Lesson[];
}

export interface Part {
  folder: string;
  title: string;
  chapters: Chapter[];
}

const PART_FOLDER = /^part-[ivx]+-/;
const CHAPTER_FOLDER = /^ch\d{2}-/;
const STEP_FOLDER = /^\d{2}-/;
const HOMEWORK_STEP = /-homework$/;

function requireString(obj: Record<string, unknown>, key: string, source: string): string {
  const value = obj[key];
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(`${source}: "${key}" must be a non-empty string`);
  }
  return value;
}

function optionalStrings(obj: Record<string, unknown>, key: string, source: string): string[] {
  const value = obj[key];
  if (value === undefined) {
    return [];
  }
  if (!Array.isArray(value) || !value.every((item) => typeof item === "string")) {
    throw new Error(`${source}: "${key}" must be an array of strings`);
  }
  return value;
}

// Checks a parsed lesson.json and returns it in a typed form. Any problem names the file and the field.
export function parseLessonMeta(raw: unknown, source: string): LessonMeta {
  if (typeof raw !== "object" || raw === null || Array.isArray(raw)) {
    throw new Error(`${source}: expected a JSON object`);
  }
  const obj = raw as Record<string, unknown>;

  const runtime = requireString(obj, "runtime", source);
  if (runtime !== "node") {
    throw new Error(`${source}: "runtime" must be "node" for now, not "${runtime}"`);
  }

  const minutes = obj["minutes"];
  if (typeof minutes !== "number" || !Number.isFinite(minutes) || minutes <= 0) {
    throw new Error(`${source}: "minutes" must be a positive number`);
  }

  const expected = obj["expected"];
  if (expected !== undefined && typeof expected !== "string") {
    throw new Error(`${source}: "expected" must be a string when it's given`);
  }

  const meta: LessonMeta = {
    title: requireString(obj, "title", source),
    runtime: "node",
    minutes,
    objective: requireString(obj, "objective", source),
    prerequisites: optionalStrings(obj, "prerequisites", source),
    verify: optionalStrings(obj, "verify", source),
  };
  if (expected !== undefined) {
    meta.expected = expected;
  }
  return meta;
}

// Turns a part folder into a title: part-i-foundations becomes "Part I - Foundations".
export function partTitle(folder: string): string {
  const match = /^part-([ivx]+)-(.*)$/.exec(folder);
  if (match === null) {
    return folder;
  }
  const words = match[2].split("-").filter((word) => word !== "");
  const capitalised = words.map((word) => word.charAt(0).toUpperCase() + word.slice(1));
  return `Part ${match[1].toUpperCase()} - ${capitalised.join(" ")}`;
}

// Turns a chapter folder into a short name, as the window shows it.
export function chapterTitle(folder: string): string {
  const match = /^ch(\d{2})-(.*)$/.exec(folder);
  if (match === null) {
    return folder;
  }
  const words = match[2].replaceAll("-", " ");
  return `Ch${match[1]} \u00b7 ${words.charAt(0).toUpperCase()}${words.slice(1)}`;
}

function isMissingFile(err: unknown): boolean {
  return typeof err === "object" && err !== null && "code" in err && err.code === "ENOENT";
}

async function listFolders(path: string, pattern: RegExp): Promise<string[]> {
  return (await readdir(path, { withFileTypes: true }))
    .filter((entry) => entry.isDirectory() && pattern.test(entry.name))
    .map((entry) => entry.name)
    .sort();
}

// Reads one lesson folder. Returns undefined when the folder has no lesson.json.
async function readLesson(stepPath: string, chapterName: string, step: string, homework: boolean): Promise<Lesson | undefined> {
  const metaPath = join(stepPath, "lesson.json");
  const source = `${chapterName}/${step}/lesson.json`;

  let text: string;
  try {
    text = await readFile(metaPath, "utf8");
  } catch (err) {
    if (isMissingFile(err)) {
      return undefined;
    }
    throw err;
  }

  let raw: unknown;
  try {
    raw = JSON.parse(text);
  } catch (err) {
    const reason = err instanceof Error ? err.message : String(err);
    throw new Error(`${source}: not valid JSON (${reason})`);
  }

  return {
    chapter: chapterName,
    step,
    path: stepPath,
    homework,
    meta: parseLessonMeta(raw, source),
  };
}

// Reads one chapter's steps in order. A homework step is a folder whose name ends in -homework; its exercises are the
// lesson folders inside it. Regular steps come first, then the homework.
async function loadChapter(chapterPath: string, chapterName: string): Promise<Lesson[]> {
  const regular: Lesson[] = [];
  const homework: Lesson[] = [];

  for (const stepName of await listFolders(chapterPath, STEP_FOLDER)) {
    const stepPath = join(chapterPath, stepName);
    if (HOMEWORK_STEP.test(stepName)) {
      for (const exerciseName of await listFolders(stepPath, STEP_FOLDER)) {
        const lesson = await readLesson(join(stepPath, exerciseName), chapterName, `${stepName}/${exerciseName}`, true);
        if (lesson !== undefined) {
          homework.push(lesson);
        }
      }
      continue;
    }
    const lesson = await readLesson(stepPath, chapterName, stepName, false);
    if (lesson !== undefined) {
      regular.push(lesson);
    }
  }

  return [...regular, ...homework];
}

// Reads every part under root, in folder-name order. A part with no chapters that have lessons is left out.
export async function loadParts(root: string): Promise<Part[]> {
  const parts: Part[] = [];

  for (const partFolder of await listFolders(root, PART_FOLDER)) {
    const partPath = join(root, partFolder);
    const chapters: Chapter[] = [];

    for (const chapterName of await listFolders(partPath, CHAPTER_FOLDER)) {
      const chapterPath = join(partPath, chapterName);
      const lessons = await loadChapter(chapterPath, chapterName);
      if (lessons.length > 0) {
        chapters.push({ name: chapterName, path: chapterPath, lessons });
      }
    }

    if (chapters.length > 0) {
      parts.push({ folder: partFolder, title: partTitle(partFolder), chapters });
    }
  }

  return parts;
}

// Every chapter in every part, in course order.
export async function loadCatalog(root: string): Promise<Chapter[]> {
  return (await loadParts(root)).flatMap((part) => part.chapters);
}
