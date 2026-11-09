# Homework: parse price

A checkout form receives prices as text. A valid price becomes a number, and anything else is reported to the shopper as an error message, not thrown as an exception. The exercise writes the parser as a result-returning function, and prints either the price or the error, so the caller must handle both.

> **Coming from JavaScript:** `Number` and template strings work the same way in both languages. The `Result` union and the narrowing on `ok` are the TypeScript part.

## The task

Here is the starting code, which converts the text to a number:

```ts
console.log(Number("12.50"));
```

Start from the code above, in your own file. Write a `Result` type that is either `{ ok: true; value: number }` or `{ ok: false; error: string }`. Write a function `parsePrice(text: string): Result` that returns a success when `Number` can read the text, and a failure with the message `"<text>" is not a price` when it can't. Then call `parsePrice("12.50")`, and print `Price: 12.5` for a success, or the error message for a failure. The output should be:

```
Price: 12.5
```

## Hints

- `Number.isNaN` checks whether the conversion failed.
- Check `ok` before reading `value` or `error`, so the checker knows which one is there.

## When you're stuck

Show the solution. It's a spoiler, so give it a proper attempt in your own file first.

## Quiz

```quiz
Why does the function return a failure, rather than throw, when the text isn't a price?
○ Because the checker forbids `throw` in functions.
→ Not quite. The checker allows `throw`. The reason is the nature of the failure.
◉ Because a bad price typed by a shopper is an expected event, so it is returned as a value.
→ Right. Expected failures are returned, so the caller is required to handle them.
○ Because `Number` never throws.
→ Not quite. `Number` doesn't throw, but that isn't the reason for the design.
```
