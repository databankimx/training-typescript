# Homework: a pipe function

`compose` joins two functions. A pipeline often needs more, such as a price passing through a discount, then a tax, then a rounding step. The exercise writes `pipe`, which takes any number of steps and runs them left to right. It is `compose` with the order reversed, and it works for any number of steps.

> **Coming from JavaScript:** `reduce` and rest parameters are the same in both languages. The `Array<(n: number) => number>` type on the rest parameter is the TypeScript part.

## The task

Start from the starter `main.ts`, which has a placeholder `pipe` that returns its input unchanged. Replace it so that:

1. `pipe(...steps)` returns a function that takes a number.
2. That function passes the number through each step in order, giving each step the result of the one before.

With the starter's two calls, the output should be:

```text
10
9
```

`pipe(addOne, double)(4)` adds one first, giving 5, then doubles it, giving 10. `pipe(double, addOne)(4)` doubles first, giving 8, then adds one, giving 9.

## Hints

- `reduce` is built for this: the accumulator starts as the input and becomes the result of each step.
- Each step's type is `(n: number) => number`, so the accumulator has the same type throughout.

## Try it yourself

- Add a third step, such as `(n: number): number => n - 3`, and check the result of `pipe(addOne, double, subtractThree)(4)` by hand first.
- Call `pipe()` with no steps. What does it return for 4, and why?

## Quiz

```quiz
Why does `pipe(double, addOne)(4)` give 9, not 10?
○ Because `pipe` runs the steps in reverse.
→ Not quite. `pipe` runs them in the order given, which is `double` then `addOne`.
◉ Because `double` runs first, giving 8, and then `addOne` gives 9.
→ Right. The order of the arguments is the order of the steps.
○ Because `addOne` is always applied last.
→ Not quite. Only the order in which the steps are passed decides it.
```
