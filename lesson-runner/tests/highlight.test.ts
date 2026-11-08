import { test } from "node:test";
import assert from "node:assert/strict";
import { highlightCode } from "../src/core/highlight.ts";
import { createLessonMarkdown } from "../src/core/markdown.ts";

function highlightTs(code: string): string {
  const html = highlightCode("typescript", code);
  if (html === undefined) {
    throw new Error("typescript should be supported");
  }
  return html;
}

test("marks TypeScript keywords and strings with their token classes", () => {
  const html = highlightTs('const greeting = "hi";');
  assert.match(html, /<span class="tok-keyword">const<\/span>/);
  assert.match(html, /<span class="tok-string">&quot;hi&quot;<\/span>/);
});

test("escapes angle brackets in code, so they can't become markup", () => {
  const html = highlightTs("if (a < b) run();");
  assert.match(html, /&lt;/);
  assert.doesNotMatch(html, /<b>/);
});

test("ts is the same as typescript", () => {
  assert.equal(highlightCode("ts", "let n = 1;"), highlightCode("typescript", "let n = 1;"));
});

test("javascript and js are highlighted with the JavaScript grammar", () => {
  const js = highlightCode("javascript", "const x = 1;");
  assert.ok(js !== undefined);
  assert.match(js, /tok-keyword/);
  assert.equal(highlightCode("js", "const x = 1;"), js);
});

test("pwsh and powershell color comments, parameters, cmdlets, and variables", () => {
  const html = highlightCode("pwsh", "# list files\nGet-ChildItem -Path $home");
  assert.ok(html !== undefined);
  assert.match(html, /<span class="tok-comment"># list files<\/span>/);
  assert.match(html, /<span class="tok-function">Get-ChildItem<\/span>/);
  assert.match(html, /<span class="tok-propertyName">-Path<\/span>/);
  assert.match(html, /<span class="tok-variableName">\$home<\/span>/);
});

test("pwsh colors strings and keeps unmatched text as plain text", () => {
  const html = highlightCode("pwsh", "Write-Host 'done'");
  assert.ok(html !== undefined);
  assert.match(html, /<span class="tok-string">&#39;done&#39;<\/span>/);
  assert.match(html, /^<span class="tok-function">Write-Host<\/span> /);
});

test("a label that isn't supported returns undefined", () => {
  assert.equal(highlightCode("c", "int main(void) {}"), undefined);
  assert.equal(highlightCode("python", "print('hi')"), undefined);
});

test("typescript and ts fences in a lesson are colored", () => {
  const html = createLessonMarkdown().render(["```typescript", "const n: number = 1;", "```"].join("\n"));
  assert.match(html, /<code class="language-typescript">/);
  assert.match(html, /tok-keyword/);

  const short = createLessonMarkdown().render(["```ts", "let total = 0;", "```"].join("\n"));
  assert.match(short, /tok-keyword/);
});

test("pwsh fences in a lesson are colored", () => {
  const html = createLessonMarkdown().render(["```pwsh", "Get-Date", "```"].join("\n"));
  assert.match(html, /<code class="language-pwsh">/);
  assert.match(html, /tok-function/);
});

test("unlabelled fences are plain text", () => {
  const html = createLessonMarkdown().render(["```", "const shown = 1;", "```"].join("\n"));
  assert.doesNotMatch(html, /tok-/);
  assert.match(html, /const shown = 1;/);
});

test("fences with an unsupported label are plain text", () => {
  const html = createLessonMarkdown().render(["```text", "Hello, world!", "```"].join("\n"));
  assert.doesNotMatch(html, /tok-/);
});
