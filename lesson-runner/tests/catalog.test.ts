import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, mkdir, writeFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { chapterTitle, loadCatalog, loadParts, parseLessonMeta, partTitle } from "../src/core/catalog.ts";

const validMeta = {
  title: "Hello, world!",
  runtime: "node",
  minutes: 10,
  objective: "Run a program.",
  expected: "Hello, world!",
  verify: ["Hello, world!"],
};

// Every test course has the layout part-<roman>-<words>/ch<NN>-<words>/<NN>-<words>/lesson.json.
const PART = "part-i-test";

async function makeRoot(): Promise<string> {
  return mkdtemp(join(tmpdir(), "ts-catalog-"));
}

// Writes a lesson at root/part-i-test/chapter/step/lesson.json. The step may be a path, such as "04-homework/01-x".
async function writeLesson(root: string, chapter: string, step: string, meta: unknown): Promise<void> {
  const dir = join(root, PART, chapter, step);
  await mkdir(dir, { recursive: true });
  await writeFile(join(dir, "lesson.json"), JSON.stringify(meta), "utf8");
}

test("parses a valid lesson.json", () => {
  const meta = parseLessonMeta(validMeta, "fixture");
  assert.equal(meta.title, "Hello, world!");
  assert.equal(meta.expected, "Hello, world!");
  assert.deepEqual(meta.prerequisites, []);
});

test("names the file and field when a required string is missing", () => {
  assert.throws(() => parseLessonMeta({ ...validMeta, title: "" }, "ch01/01/lesson.json"), /ch01\/01\/lesson\.json: "title"/);
});

test("rejects a runtime other than node", () => {
  assert.throws(() => parseLessonMeta({ ...validMeta, runtime: "browser" }, "fixture"), /runtime/);
});

test("rejects non-positive minutes", () => {
  assert.throws(() => parseLessonMeta({ ...validMeta, minutes: 0 }, "fixture"), /minutes/);
});

test("turns part and chapter folder names into titles", () => {
  assert.equal(partTitle("part-i-foundations"), "Part I - Foundations");
  assert.equal(partTitle("part-iii-working-with-html"), "Part III - Working With HTML");
  assert.equal(chapterTitle("ch01-getting-started"), "Ch01 \u00b7 Getting started");
});

test("loads parts, then chapters and steps, in folder-name order, skipping folders without lesson.json", async () => {
  const root = await makeRoot();
  try {
    await writeLesson(root, "ch02-second", "01-later", { ...validMeta, title: "Second chapter" });
    await writeLesson(root, "ch01-first", "02-two", { ...validMeta, title: "Step two" });
    await writeLesson(root, "ch01-first", "01-one", { ...validMeta, title: "Step one" });
    await mkdir(join(root, PART, "ch03-empty", "01-no-lesson-json"), { recursive: true });
    await mkdir(join(root, PART, "ch01-first", "03-helpers"), { recursive: true });
    await mkdir(join(root, "tools", "01-not-a-part"), { recursive: true });

    const parts = await loadParts(root);

    assert.equal(parts.length, 1);
    assert.equal(parts[0].title, "Part I - Test");
    assert.deepEqual(
      parts[0].chapters.map((chapter) => chapter.name),
      ["ch01-first", "ch02-second"],
    );
    assert.deepEqual(
      parts[0].chapters[0].lessons.map((lesson) => lesson.meta.title),
      ["Step one", "Step two"],
    );
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("a homework step's exercises come after the regular steps, flagged as homework", async () => {
  const root = await makeRoot();
  try {
    await writeLesson(root, "ch01-first", "01-lesson", { ...validMeta, title: "Lesson" });
    await writeLesson(root, "ch01-first", "02-homework/01-exercise", { ...validMeta, title: "Exercise" });
    await writeLesson(root, "ch01-first", "02-homework/02-second", { ...validMeta, title: "Second exercise" });

    const lessons = (await loadCatalog(root))[0].lessons;

    assert.deepEqual(
      lessons.map((lesson) => lesson.meta.title),
      ["Lesson", "Exercise", "Second exercise"],
    );
    assert.deepEqual(
      lessons.map((lesson) => lesson.homework),
      [false, true, true],
    );
    assert.equal(lessons[1].step, "02-homework/01-exercise");
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("reports a broken lesson.json with its location", async () => {
  const root = await makeRoot();
  try {
    await writeLesson(root, "ch01-first", "01-broken", { ...validMeta, objective: 42 });
    await assert.rejects(loadCatalog(root), /ch01-first\/01-broken\/lesson\.json: "objective"/);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("reports a lesson.json that isn't valid JSON", async () => {
  const root = await makeRoot();
  try {
    const dir = join(root, PART, "ch01-first", "01-garbled");
    await mkdir(dir, { recursive: true });
    await writeFile(join(dir, "lesson.json"), "{ not json", "utf8");
    await assert.rejects(loadCatalog(root), /not valid JSON/);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("loads the course's own parts and Chapter 1 from the repository", async () => {
  const root = fileURLToPath(new URL("../../", import.meta.url));
  const parts = await loadParts(root);

  assert.equal(parts[0].title, "Part I - Foundations");
  const chapter = parts[0].chapters.find((item) => item.name === "ch01-getting-started");
  if (chapter === undefined) {
    throw new Error("ch01-getting-started should be in the catalog");
  }
  assert.equal(chapter.lessons[0].meta.title, "Setup");
  assert.ok(chapter.lessons.some((lesson) => lesson.meta.title === "Hello, world!"));
});

test("the course's Chapter 2 has its homework after its regular steps", async () => {
  const root = fileURLToPath(new URL("../../", import.meta.url));
  const chapters = await loadCatalog(root);
  const chapter = chapters.find((item) => item.name === "ch02-types-as-promises");
  if (chapter === undefined) {
    throw new Error("ch02-types-as-promises should be in the catalog");
  }
  const last = chapter.lessons[chapter.lessons.length - 1];
  assert.equal(last.homework, true);
  assert.equal(last.step, "04-homework/01-find-the-mistake");
});
