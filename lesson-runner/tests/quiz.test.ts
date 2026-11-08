import { test } from "node:test";
import assert from "node:assert/strict";
import { parseQuiz, type ChoiceQuiz, type FillQuiz } from "../src/core/quiz.ts";

// Narrows a parsed quiz to one kind, and fails the test if it's the other kind.
function asChoice(quiz: ReturnType<typeof parseQuiz>): ChoiceQuiz {
  if (quiz.kind !== "choice") {
    throw new Error(`expected a choice quiz, got ${quiz.kind}`);
  }
  return quiz;
}

function asFill(quiz: ReturnType<typeof parseQuiz>): FillQuiz {
  if (quiz.kind !== "fill") {
    throw new Error(`expected a fill-in quiz, got ${quiz.kind}`);
  }
  return quiz;
}

test("parses a choice quiz with feedback", () => {
  const quiz = asChoice(
    parseQuiz(
      [
        "Which keyword declares a constant?",
        "○ var",
        "→ var declares a variable that can be reassigned.",
        "◉ const",
        "→ Right. const can't be reassigned.",
      ].join("\n"),
    ),
  );

  assert.equal(quiz.question, "Which keyword declares a constant?");
  assert.equal(quiz.choices.length, 2);
  assert.deepEqual(quiz.choices[1], {
    text: "const",
    correct: true,
    feedback: "Right. const can't be reassigned.",
  });
});

test("parses a fill-in quiz", () => {
  const quiz = asFill(
    parseQuiz(["Every program starts running at a function called:", "[ main ]", "→ Its name is fixed."].join("\n")),
  );

  assert.equal(quiz.answer, "main");
  assert.equal(quiz.feedback, "Its name is fixed.");
});

test("question text can run over several lines", () => {
  const quiz = asChoice(parseQuiz(["A long question that", "continues here.", "○ no", "◉ yes"].join("\n")));

  assert.equal(quiz.question, "A long question that continues here.");
});

test("rejects a choice quiz with no right answer", () => {
  assert.throws(() => parseQuiz(["Question?", "○ one", "○ two"].join("\n")), /exactly one right answer/);
});

test("rejects a choice quiz with two right answers", () => {
  assert.throws(() => parseQuiz(["Question?", "◉ one", "◉ two"].join("\n")), /exactly one right answer/);
});

test("rejects a quiz with no question text", () => {
  assert.throws(() => parseQuiz(["○ one", "◉ two"].join("\n")), /needs question text/);
});

test("rejects a stray line after the answers", () => {
  assert.throws(() => parseQuiz(["Question?", "○ one", "◉ two", "oops"].join("\n")), /Unexpected line/);
});
