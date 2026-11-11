import { test } from "node:test";
import assert from "node:assert/strict";
import { createLessonMarkdown } from "../src/core/markdown.ts";

test("renders ordinary markdown", () => {
  const html = createLessonMarkdown().render("# Hello\n\nSome `code`.");
  assert.match(html, /<h1>Hello<\/h1>/);
  assert.match(html, /<code>code<\/code>/);
});

test("renders a quiz fence as a choice quiz", () => {
  const html = createLessonMarkdown().render(
    ["```quiz", "What prints?", "○ nothing", "◉ Hello", "→ Right.", "```"].join("\n"),
  );
  assert.match(html, /quiz-choice-set/);
  assert.match(html, /data-correct="true"/);
  assert.match(html, /data-correct="false"/);
  assert.match(html, /Right\./);
});

test("renders a quiz fence as a fill-in quiz", () => {
  const html = createLessonMarkdown().render(["```quiz", "Entry point?", "[ main ]", "```"].join("\n"));
  assert.match(html, /quiz-fill/);
  assert.match(html, /data-answer="main"/);
});

test("escapes raw HTML in lessons instead of running it", () => {
  const html = createLessonMarkdown().render("<script>alert(1)</script>");
  assert.doesNotMatch(html, /<script>/);
});

test("escapes quoted answers in attributes", () => {
  const html = createLessonMarkdown().render(["```quiz", "Pick a string", "[ \"hi\" ]", "```"].join("\n"));
  assert.match(html, /data-answer="&quot;hi&quot;"/);
});

test("a malformed quiz fails the render with its message", () => {
  assert.throws(
    () => createLessonMarkdown().render(["```quiz", "Question?", "○ only one", "```"].join("\n")),
    /at least two choices/,
  );
});
