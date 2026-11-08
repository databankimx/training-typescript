import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { loadCatalog } from "../src/core/catalog.ts";
import { createLessonMarkdown } from "../src/core/markdown.ts";

// Renders every lesson and chapter introduction in the course. A broken quiz or a bad lesson.json fails here, rather
// than when a learner tries to open the lesson in the runner.
test("every lesson in the course renders", async () => {
  const root = fileURLToPath(new URL("../../", import.meta.url));
  const markdown = createLessonMarkdown();
  const failures: string[] = [];

  for (const chapter of await loadCatalog(root)) {
    const introPath = join(chapter.path, "lesson.md");
    const sources: { name: string; text: string }[] = [];
    try {
      sources.push({ name: `${chapter.name} (introduction)`, text: await readFile(introPath, "utf8") });
    } catch {
      // A chapter without an introduction is allowed.
    }
    for (const lesson of chapter.lessons) {
      sources.push({
        name: `${chapter.name}/${lesson.step}`,
        text: await readFile(join(lesson.path, "lesson.md"), "utf8"),
      });
    }

    for (const source of sources) {
      try {
        markdown.render(source.text);
      } catch (err) {
        failures.push(`${source.name}: ${err instanceof Error ? err.message : String(err)}`);
      }
    }
  }

  assert.deepEqual(failures, []);
});
