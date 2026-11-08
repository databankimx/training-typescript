# If and else

A program that always does the same thing is a recording, not a program. An `if` statement lets it choose. It checks a condition, and runs one block of code when the answer is yes and another when it's no.

> **Coming from JavaScript:** `if` and `else` are the same in both languages. The condition is a boolean, as in the last chapter.

## The program

The program is already in `main.ts`:

```ts
const score: number = 62;

if (score >= 50) {
  console.log("pass");
} else {
  console.log("fail");
}
```

Press **Run**. You should see `pass`.

The parts work like this:

- **`if (...)`** holds the condition. It's a question with a yes or no answer, such as `score >= 50`.
- **The first block**, in braces after the `if`, runs when the answer is yes.
- **`else`** introduces the second block, which runs when the answer is no.

The program runs one block or the other, never both. The score is `62`, which is at least `50`, so the answer is yes, and the program prints `pass`.

## Changing the answer

Change `score` to `40`, and run again. The condition is now no, so the block after `else` runs, and the program prints `fail`.

The condition is evaluated each time the program reaches it. The same program can take a different path depending on the values it's given, which is what makes it useful.

## Try it

- Change `score` to exactly `50`, and run again. Is the boundary a pass or a fail?
- Add a line after the `if` block, outside the braces, that prints `done`. Does it run for both results?
- Change `>=` to `>`, and use `50` as the score. What does the program print now?

## Quiz

```quiz
What does `if (score >= 50) { ... } else { ... }` do when `score` is `50`?
○ Runs the block after `else`.
→ Not quite. `>=` accepts equal values, so `50` takes the yes branch.
◉ Runs the block after `if`.
→ Right. The condition is yes, because `50` is at least `50`.
○ Runs both blocks.
→ Not quite. An if statement runs one branch or the other.
```

```quiz
Which part of an `if` statement holds the question?
○ The braces `{ }`.
→ Not quite. The braces hold the instructions that run.
◉ The part in brackets after `if`.
→ Right. The condition goes between the brackets, and it's either yes or no.
○ The word `else`.
→ Not quite. `else` introduces the no branch, and it doesn't hold a condition.
```
