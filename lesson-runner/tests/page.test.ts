import { test } from "node:test";
import assert from "node:assert/strict";
import { transpileForBrowser } from "../src/core/page.ts";

test("removes the type labels, leaving JavaScript a browser can run", () => {
  const js = transpileForBrowser("const count: number = 3;\nconsole.log(count);");
  assert.doesNotMatch(js, /: number/);
  assert.match(js, /const count = 3/);
});

test("rewrites relative imports from .ts to .js, so the page loads the compiled module", () => {
  const js = transpileForBrowser("import { greet } from './greetings.ts';\ngreet();");
  assert.match(js, /from ['"]\.\/greetings\.js['"]/);
  assert.doesNotMatch(js, /\.ts['"]/);
});
