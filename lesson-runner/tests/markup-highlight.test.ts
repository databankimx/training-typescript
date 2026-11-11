import { test } from "node:test";
import assert from "node:assert/strict";
import { highlightCode } from "../src/core/highlight.ts";

test("colors HTML tags, attribute names, and attribute values", () => {
  const html = highlightCode("html", '<input id="name" type="text">') ?? "";
  assert.match(html, /<span class="tok-keyword">&lt;input<\/span>/);
  assert.match(html, /<span class="tok-propertyName">id<\/span>/);
  assert.match(html, /<span class="tok-string">&quot;name&quot;<\/span>/);
});

test("colors CSS selectors, property names, values, and comments", () => {
  const css = highlightCode("css", "/* base */\nbody {\n  color: #1f2937;\n  margin: 2.5rem;\n}") ?? "";
  assert.match(css, /<span class="tok-comment">\/\* base \*\/<\/span>/);
  assert.match(css, /<span class="tok-typeName">body <\/span>/);
  assert.match(css, /<span class="tok-propertyName">color<\/span>/);
  assert.match(css, /<span class="tok-number">#1f2937<\/span>/);
  assert.match(css, /<span class="tok-number">2\.5rem<\/span>/);
});

test("a plain label escapes the text and colors nothing", () => {
  assert.equal(highlightCode("plain", "a < b"), "a &lt; b");
});

test("escapes markup inside the colored output, so the page never runs it", () => {
  const html = highlightCode("html", "<p>&lt;script&gt;</p>") ?? "";
  assert.doesNotMatch(html, /<script>/);
});
