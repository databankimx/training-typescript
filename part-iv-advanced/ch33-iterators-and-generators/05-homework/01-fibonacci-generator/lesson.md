# Homework: a Fibonacci generator

The Fibonacci sequence never ends, and a generator is the natural way to describe it. The exercise writes that generator, and reads its first eight values with the `take` function from the previous step.

> **Coming from JavaScript:** generators are the same in both languages. The `Generator<number>` label is the TypeScript part.

## The task

Start from the starter `main.ts`, which includes `take` and a placeholder generator that yields only 0. Replace the placeholder so that `fibonacci` yields `0, 1, 1, 2, 3, 5, 8, 13, ...` forever:

1. Keep the two most recent values in variables.
2. In an infinite loop, yield the older value, then move the pair forward.

The output should be:

```text
0, 1, 1, 2, 3, 5, 8, 13
```

## Hints

- Yield `previous`, then compute the next value as `previous + current`.
- Move the pair forward by setting `previous` to `current`, and `current` to the new value.

## Try it yourself

- Read 12 values instead of 8. What is the last one?
- Change the generator so it starts at `1, 2, 3, ...`. Which line changes?

## Quiz

```quiz
Why does `take(fibonacci(), 8)` finish, even though the generator has no end?
○ Because the generator stops after eight values.
→ Not quite. The generator never stops on its own.
◉ Because `take` breaks out of the loop after eight values, so the generator is no longer asked for values.
→ Right. The consumer decides how much of the infinite sequence to read.
○ Because the sequence only has eight numbers in it.
→ Not quite. The sequence is infinite.
```
