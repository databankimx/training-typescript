import { test } from "node:test";
import assert from "node:assert/strict";
import { emptyState, parseState, serialiseState } from "../src/core/state.ts";

test("a missing state file gives an empty state", () => {
  assert.deepEqual(parseState(undefined), emptyState());
});

test("a damaged state file gives an empty state, so the runner still starts", () => {
  assert.deepEqual(parseState("{ not json"), emptyState());
  assert.deepEqual(parseState("[1, 2, 3]"), emptyState());
});

test("saved progress survives a round trip", () => {
  const state = emptyState();
  state.last = "ch01-getting-started/01-hello-world";
  state.progress["ch02-types-as-promises/01-annotations"] = {
    revealed: true,
    quizzes: { "0": { chosen: 2 }, "1": { typed: "main" } },
  };

  assert.deepEqual(parseState(serialiseState(state)), state);
});

test("only the parts the runner understands are kept", () => {
  const text = JSON.stringify({ last: 42, progress: { good: { revealed: true }, bad: "text" }, extra: true });
  const state = parseState(text);

  assert.equal(state.last, undefined);
  assert.deepEqual(state.progress, { good: { revealed: true } });
});
