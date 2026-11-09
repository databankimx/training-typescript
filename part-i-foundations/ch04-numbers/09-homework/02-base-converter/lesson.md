# Homework: base converter

The same number, written two ways. This exercise is short, and it's a useful reminder that a number is still the same number, whatever you choose to call it.

> **Coming from JavaScript:** `toString(base)` works the same way in both languages.

## The task

The number `255` is stored as a value. Here is the starting code, which prints it in ordinary base 10:

```ts
const value: number = 255;

console.log(value);
```

Start from the code above, in your own file, and change it so that it prints two lines:

1. the value in binary, which is `11111111`, and
2. the value in hexadecimal, which is `ff`.

## Hints

- `toString` takes the base as an argument: `2` for binary, `16` for hexadecimal.
- Each line of output is text, so you don't need to convert anything else.

## When you're stuck

Show the solution. It's a spoiler, so give it a proper attempt in your own file first.

## Quiz

```quiz
Why does 255 need eight binary digits?
○ Because 255 is a large number.
→ Not quite. The size of the number isn't what decides the digits.
◉ Because the largest eight-digit binary number, 11111111, is exactly 255.
→ Right. Eight binary digits can count from 0 to 255, so 255 needs all eight.
○ Because the checker adds two extra digits.
→ Not quite. The checker doesn't change how numbers are written.
```
