# Homework: safe divide

A calculator divides one number by another, and a division by zero must not crash the screen. The divide function should refuse a zero divisor with a clear message, and the screen should catch that message and show it. The exercise combines a `throw` in the function with a `try` and `catch` at the call.

> **Coming from JavaScript:** `throw`, `try`, and `catch` work the same way in both languages. The `number` labels are the TypeScript part.

## The task

Here is the starting code, which divides ten by two:

```ts
console.log(10 / 2);
```

Start from the code above, in your own file. Write a function `divide(a, b)` that returns `a / b`, but throws an `Error` with the message `Cannot divide by zero` when `b` is zero. Then call `divide(10, 2)` and print the result, and call `divide(1, 0)` inside a `try` block, printing the error's message from the `catch` block. The output should be:

```
5
Cannot divide by zero
```

## Hints

- Check for a zero divisor before dividing.
- The `catch` block must narrow the caught value with `instanceof Error` before it reads `message`.

## When you're stuck

Show the solution. It's a spoiler, so give it a proper attempt in your own file first.

## Quiz

```quiz
Why does the `divide(1, 0)` call go inside the `try` block, rather than only the `divide(10, 2)` call?
○ Because `try` blocks can only hold one call.
→ Not quite. A `try` block can hold as many statements as it needs.
◉ Because a failure in that call would otherwise stop the program, and the `catch` handles it.
→ Right. The `try` block contains the failure, so the program can print a message and carry on.
○ Because `divide(10, 2)` cannot be inside a `try`.
→ Not quite. It can. The question is which call might fail.
```
