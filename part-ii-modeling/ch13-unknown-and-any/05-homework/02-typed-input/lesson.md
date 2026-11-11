# Homework: typed input

A form field arrives as an `unknown` value. When the field holds text, it contains a number the user typed, and the program needs that number doubled. Anything else is not something the form should send, so the program reports that instead of guessing.

> **Coming from JavaScript:** `Number`, `typeof`, and `*` work the same way in both languages. The `unknown` label is the TypeScript part.

## The task

Here is the starting code, which prints the input as it arrived:

```ts
const input: unknown = "42";

console.log(input);
```

Start from the code above, in your own file. If the input is text, convert it to a number and print the number doubled. Otherwise print `Not text`. With the input above, the output should be:

```
84
```

## Hints

- Narrow the value with `typeof` first, so the checker allows the text operations.
- `Number(...)` turns the text into a number before you multiply.

## When you're stuck

Show the solution. It's a spoiler, so give it a proper attempt in your own file first.

## Quiz

```quiz
Why convert the text with `Number` before multiplying by two?
○ Because `Number` removes any spaces from the text.
→ Not quite. The conversion is about the type of the value, not the spaces in it.
◉ Because the checker refuses `*` on text, so the number must be made explicit first.
→ Right. Converting first gives the checker a number, and the calculation is clear to the next reader.
○ Because `Number` is faster than the `*` operator.
→ Not quite. The reason is clarity and the checker's rules, not speed.
```
