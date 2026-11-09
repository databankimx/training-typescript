import { test } from "node:test";
import assert from "node:assert/strict";
import { chapterTitle, partTitle } from "../src/core/catalog.ts";

test("part titles keep the capitals of special words", () => {
  assert.equal(partTitle("part-iii-working-with-html"), "Part III - Working With HTML");
  assert.equal(partTitle("part-i-foundations"), "Part I - Foundations");
});

test("chapter titles are sentence case, keep special words, and use a hyphen after the number", () => {
  assert.equal(chapterTitle("ch20-typing-the-dom"), "Ch20 - Typing the DOM");
  assert.equal(chapterTitle("ch19-http-and-data"), "Ch19 - HTTP and data");
  assert.equal(chapterTitle("ch01-getting-started"), "Ch01 - Getting started");
});
