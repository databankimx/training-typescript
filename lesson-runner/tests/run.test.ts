import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { checkFile } from "../src/core/check.ts";
import { RunSession, type RunEvent } from "../src/core/run.ts";
import { workspaceFolder } from "../src/core/workspace.ts";

const tsconfig = fileURLToPath(new URL("../../tsconfig.json", import.meta.url));

async function tempFile(name: string, text: string): Promise<{ dir: string; file: string }> {
  const dir = await mkdtemp(join(tmpdir(), "ts-runner-"));
  const file = join(dir, name);
  await writeFile(file, text, "utf8");
  return { dir, file };
}

// Runs a program, and resolves with every event it produced once it has finished.
function runToEnd(file: string, cwd: string, timeoutMs?: number): Promise<{ done: RunEvent; events: RunEvent[] }> {
  return new Promise((resolve) => {
    const events: RunEvent[] = [];
    const session = new RunSession((event) => {
      events.push(event);
      if (event.kind === "done") {
        resolve({ done: event, events });
      }
    }, timeoutMs);
    session.start(file, cwd);
  });
}

test("a lesson id becomes a folder under the work folder", () => {
  const folder = workspaceFolder("C:/course", "ch01-getting-started/01-hello-world");
  assert.match(folder, /\.runner-work[\\/]ch01-getting-started[\\/]01-hello-world$/);
});

test("a homework id keeps its homework folder", () => {
  const folder = workspaceFolder("C:/course", "ch02-types/homework/01-find");
  assert.match(folder, /ch02-types[\\/]homework[\\/]01-find$/);
});

test("a lesson id can't climb out of the work folder", () => {
  assert.throws(() => workspaceFolder("C:/course", "../secrets"), /not a valid lesson id/);
  assert.throws(() => workspaceFolder("C:/course", "ch01/../../x"), /not a valid lesson id/);
});

test("a correct program has no check errors", async () => {
  const { dir, file } = await tempFile("main.ts", "const n: number = 1;\nconsole.log(n);\n");
  try {
    assert.deepEqual(checkFile(file, tsconfig), []);
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});

test("a type error is reported with its line and column", async () => {
  const { dir, file } = await tempFile("main.ts", "const n: number = 'text';\n");
  try {
    const diagnostics = checkFile(file, tsconfig);
    assert.equal(diagnostics.length, 1);
    assert.equal(diagnostics[0].line, 1);
    assert.equal(diagnostics[0].column, 7);
    assert.match(diagnostics[0].message, /not assignable to type 'number'/);
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});

test("a run sends the program's output and reports a clean exit", async () => {
  const { dir, file } = await tempFile("main.ts", "console.log('hello from the run');\n");
  try {
    const { done, events } = await runToEnd(file, dir);
    assert.deepEqual(done, { kind: "done", code: 0, timedOut: false });
    const output = events
      .filter((event) => event.kind === "stdout")
      .map((event) => (event.kind === "stdout" ? event.text : ""))
      .join("");
    assert.match(output, /hello from the run/);
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});

test("a program that runs too long is stopped and reported", async () => {
  const { dir, file } = await tempFile("main.ts", "while (true) {}\n");
  try {
    const { done, events } = await runToEnd(file, dir, 300);
    assert.equal(done.kind === "done" && done.timedOut, true);
    assert.ok(events.some((event) => event.kind === "status" && /more than 0\.3 seconds/.test(event.text)));
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});
