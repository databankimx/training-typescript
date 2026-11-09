# The Math library

The Math library holds calculations that someone else has already got right, which is a good reason to use it. This step covers the most useful functions, and the constant pi, which is not, despite appearances, a convenient round number.

> **Coming from JavaScript:** the `Math` object is the same in both languages, with the same functions and constants.

## A library of ready-made calculations

`Math` is a built-in group of calculations. You don't need to write the code for them yourself. You call a function from the group with the dot, the same way as `Number.isInteger` in an earlier step:

```ts
console.log(Math.max(3, 9, 4));
console.log(Math.min(3, 9, 4));
```

- **`Math.max`** gives the largest of the values you pass to it, `9`.
- **`Math.min`** gives the smallest, `3`.

These functions take as many values as you give them, not just two.

## Absolute value and square root

```ts
console.log(Math.abs(-7));
console.log(Math.sqrt(81));
```

- **`Math.abs`** removes the minus sign, so `-7` becomes `7`. This is the distance from zero, which is useful when you care about how far something is, not which direction.
- **`Math.sqrt`** gives the square root. The square root of `81` is `9`, because `9 times 9` is `81`.

## Constants

A **constant** is a value that doesn't change. `Math.PI` holds pi, the ratio of a circle's circumference to its width, to many decimal places:

```ts
console.log(Math.PI.toFixed(2));
```

`toFixed(2)` shows it with two decimal places, which gives `3.14`. The `PI` isn't a function, so there are no brackets after it.

## Press Run

The program is already in `main.ts`. You should see:

```
9
3
7
9
3.14
```

## Try it

- Pass five values to `Math.max`, and check the result.
- Use `Math.abs` on a positive number. Does anything change?
- Find the square root of `50`, and round it with `toFixed(2)`.

## Quiz

```quiz
What does `Math.abs(-7)` give you?
○ -7
→ Not quite. `abs` removes the sign, so the result is always positive.
◉ 7
→ Right. The absolute value is the distance from zero.
○ 0
→ Not quite. That would be the result if the number were zero.
```

```quiz
Is `Math.PI` a function?
○ Yes, so it needs brackets.
→ Not quite. `PI` is a constant, so there are no brackets after it.
◉ No. It's a constant, holding a fixed value.
→ Right. Constants are read directly, without brackets.
○ Yes, and it returns a random number.
→ Not quite. `PI` always holds the same value.
```
