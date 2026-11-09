# Homework: delayed greeting

A kiosk greets a visitor after a short pause, while it checks the visitor's details. The program prints `start` straight away, then waits, then prints the greeting. The exercise writes the waiting part as an `async` function, so the caller reads the steps in order.

> **Coming from JavaScript:** `async`, `await`, and `setTimeout` work the same way in both languages. The `Promise<string>` and `Promise<void>` labels are the TypeScript part.

## The task

Here is the starting code, which prints `start`:

```ts
console.log("start");
```

Start from the code above, in your own file. Write a `wait` function that returns a promise resolved after a number of milliseconds. Write an `async` function `greet` that waits 50 milliseconds, then returns `"Hello, Ada"`. Then print `start`, and the result of `await greet()`. The output should be:

```
start
Hello, Ada
```

## Hints

- `setTimeout(resolve, ms)` calls `resolve` after `ms` milliseconds.
- Inside an `async` function, `await` gives you the value of the promise, which is the text.

## When you're stuck

Show the solution. It's a spoiler, so give it a proper attempt in your own file first.

## Quiz

```quiz
Why does `start` print before `Hello, Ada`, even though `greet` waits?
○ Because the greeting is printed by the timer, which runs first.
→ Not quite. The greeting is printed after `await greet()` returns, which happens last.
◉ Because `start` is printed before the program waits for the greeting.
→ Right. The first line runs straight away, and the wait happens after it.
○ Because `await` is not allowed before a line that prints.
→ Not quite. `await` can be used on any line that needs the result.
```
