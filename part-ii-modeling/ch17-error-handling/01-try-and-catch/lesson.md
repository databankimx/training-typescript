# Try and catch

A `try` block runs code that might fail. If something inside it throws an error, the program jumps to the `catch` block, instead of stopping. The `catch` block decides what to do about it. Used well, that's the difference between a program that reports a problem and one that crashes without explanation.

> **Coming from JavaScript:** `try` and `catch` are the same in both languages. The `error: unknown` label is the TypeScript part, and it's the reason the next lines are needed.

## The program

The program is already in `main.ts`:

```ts
try {
  const data: unknown = JSON.parse("{ bad json");
  console.log(data);
} catch (error: unknown) {
  if (error instanceof Error) {
    console.log(`Could not read: ${error.name}`);
  }
}
```

Press **Run**. You should see `Could not read: SyntaxError`.

Here's what happens:

- **`JSON.parse`** reads text as data. The text `{ bad json` isn't valid, so it throws an error.
- **The program skips** the rest of the `try` block, and the `console.log(data)` line never runs.
- **The `catch` block** receives the error, and reports its name, `SyntaxError`.

## Why the error is unknown

In TypeScript, anything can be thrown, not only an `Error` object. So the checker types the caught value as `unknown`, and it won't let you read `error.name` until you've confirmed it's an `Error`. The `instanceof Error` check does that. It's the same kind of narrowing you used for `unknown` values in the previous chapter.

## Try it

- Change the text to `"{ \"name\": \"Ada\" }"`, which is valid JSON. Does the `catch` block run?
- Remove the `if (error instanceof Error)` check, and press **Check**. What does the checker say?
- Add a `console.log("done");` line after the `try` and `catch` blocks. Does it run after a failure?

## Quiz

```quiz
What happens to the rest of a `try` block when something inside it throws?
○ It runs anyway, and the error is ignored.
→ Not quite. The rest of the block is skipped, and control jumps to the `catch` block.
◉ It is skipped, and the `catch` block runs.
→ Right. A throw jumps straight to the nearest `catch`.
○ The whole program stops at that line.
→ Not quite. Without a `catch`, the program stops. The `try` block exists to catch the failure.
```

```quiz
Why does the checker require `error instanceof Error` before reading `error.name`?
○ Because `name` is not a real property of errors.
→ Not quite. `name` is a real property of `Error` objects.
◉ Because anything can be thrown, so the caught value might not be an `Error` at all.
→ Right. The checker types the caught value as `unknown`, so the check proves it's an `Error` first.
○ Because `catch` blocks can't read variables.
→ Not quite. They can. The check is about the type of the error.
```
