# Homework: format overloads

A reporting library formats a number as plain text, and a date as its calendar day. One function name serves both, so callers do not have to remember a different name for each kind of value. Overloads let the function have two precise signatures over one implementation.

> **Coming from JavaScript:** the implementation is ordinary JavaScript, and `instanceof` and `toISOString` are the same in both languages. The overload signatures are the TypeScript part.

## The task

Start from the starter `main.ts`, which formats only numbers. Then, in your own file:

1. Add the overload signature `format(value: number): string;`, and the overload `format(value: Date): string;`.
2. Make the implementation accept `number | Date`. For a date, return its day in `YYYY-MM-DD` form, using `toISOString().slice(0, 10)`. For a number, return `String(value)`.
3. Print `format(42)` and `format(new Date(Date.UTC(2026, 10, 9)))`.

The output should be:

```text
42
2026-11-09
```

## Hints

- `value instanceof Date` tells the implementation which kind of value it has.
- The implementation signature is not visible to callers, so it may accept the union, while the two overloads list the exact pairs.

## Try it yourself

- Call `format(true)`, and press Check. What does the checker report, and why?
- Change the slice to `slice(0, 4)`. What does a date print now?

## Quiz

```quiz
Why does the implementation accept `number | Date` while the overloads list `number` and `Date` separately?
◉ Because the checker requires the implementation to be wider than any single overload.
→ Right. The implementation must accept every input the overloads list, so it takes the union.
○ Because the union is faster to check.
→ Not quite. The reason is that the implementation must cover both overloads.
○ Because callers can pass the union directly.
→ Not quite. Callers see only the overloads, so the union is not offered to them.
```
