# Else if

Often a value falls into one of several ranges, such as a grade band or a shipping weight. You could write a separate `if` for each range, but that repeats the checks and makes it easy to miss one. `else if` puts the ranges in a single chain, and the program takes the first one that matches.

> **Coming from JavaScript:** `else if` is the same in both languages. The score's label is the TypeScript part.

## The program

The program is already in `main.ts`:

```ts
const score: number = 84;

if (score >= 90) {
  console.log("A");
} else if (score >= 80) {
  console.log("B");
} else if (score >= 70) {
  console.log("C");
} else {
  console.log("D or below");
}
```

Press **Run**. You should see `B`.

The program checks the conditions in order, from the top:

1. Is the score at least 90? No, `84` isn't.
2. Is it at least 80? Yes, so the program prints `B` and skips the rest.

The `else` at the bottom catches anything that didn't match above it. It's a fallback, not a condition of its own.

## The order matters

Every condition is checked from the top, and the first yes wins. If you put `score >= 70` first, every score of 70 or more would print `C`, including scores that should be `A`. Put the highest range first.

## Try it

- Change `score` to `95`, and check the output. Then change it to `69`.
- Reverse the order of the first two checks, so `score >= 80` comes before `score >= 90`. Use `95` as the score. What's printed, and why?
- Add a branch for `score >= 60`, printing `D`, before the final `else`. Then check the new fallback with `50`.

## Quiz

```quiz
Why is `score >= 90` checked before `score >= 80`?
○ Because the checker requires the highest range first.
→ Not quite. The checker doesn't care about the order. The program does.
◉ Because the first yes wins, so the highest range must come first.
→ Right. Once a branch matches, the rest are skipped, so the highest range must be first.
○ Because numbers are sorted before the program runs.
→ Not quite. The program checks the conditions in the order they're written.
```

```quiz
What does the final `else` do in a chain of `else if` statements?
○ It checks one more condition.
→ Not quite. It doesn't have a condition. It's a fallback.
◉ It runs when none of the conditions above it was yes.
→ Right. The `else` catches everything the earlier checks didn't match.
○ It runs every time, after the chain.
→ Not quite. It only runs when nothing above it matched.
```
