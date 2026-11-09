import { test } from "node:test";
import assert from "node:assert/strict";
import { chapterTitle, partTitle } from "../src/core/catalog.ts";

test("part titles keep the capitals of special words", () => {
  assert.equal(partTitle("part-iii-working-with-html"), "Part III - Working With HTML");
  assert.equal(partTitle("part-i-foundations"), "Part I - Foundations");
});

test("chapter titles are sentence case, with special words kept", () => {
  assert.equal(chapterTitle("ch20-typing-the-dom"), "Ch20 \u00b7 Typing the DOM");
  assert.equal(chapterTitle("ch19-http-and-data"), "Ch19 \u00b7 HTTP and data");
  assert.equal(chapterTitle("ch01-getting-started"), "Ch01 \u00b7 Getting started");
});
