# Finally

A `finally` block runs last, every time. It runs after a successful `try`, after a `catch`, and even when the function is about to return. That makes it the right place for cleanup that must happen regardless of the outcome: closing a file, releasing a lock, or stopping a timer.

> **Coming from JavaScript:** `finally` is the same in both languages. Its order relative to `return` is the part people most often misjudge, and the program below shows it.

## The program

The program is already in `main.ts`:

```ts
function readName(text: string): string {
  try {
    return JSON.parse(text).name;
  } catch (error: unknown) {
    return "default";
  } finally {
    console.log("checked config");
  }
}

console.log(readName('{"name":"Ada"}'));
console.log(readName("oops"));
```

Press **Run**. You should see:

```
checked config
Ada
checked config
default
```

The `finally` line prints before the name, even though the `return` comes first in the `try` block. The function gives its answer to the caller only after `finally` has run. The second call takes the `catch` path, returns `"default"`, and `finally` still runs.

## Where cleanup belongs

Put cleanup in `finally`, not after the `try` block. Code placed after the block is skipped when the `try` returns or throws, so a cleanup written there would sometimes not run.

## Try it

- Change the first call to `readName("{ bad")`. Does the output change?
- Move `console.log("checked config");` out of the `finally` block, so it sits after the whole `try` statement, still inside the function. Run the program. Which calls still print it?
- Add a second `finally` line that prints `done`, and check the order of the output.

## Quiz

```quiz
In `readName`, what happens when `return JSON.parse(text).name;` runs successfully?
○ The `finally` block is skipped, because the function already returned.
→ Not quite. `finally` still runs before the answer reaches the caller.
◉ The `finally` block runs, and then the caller receives the name.
→ Right. The return value is handed over only after `finally` has finished.
○ The `catch` block runs first, and then the `finally` block.
→ Not quite. `catch` runs only when something fails.
```

```quiz
Why is cleanup placed in `finally` rather than after the `try` statement?
○ Because `finally` is faster.
→ Not quite. The reason is that it always runs.
◉ Because code after the `try` statement is skipped when the `try` returns or throws.
→ Right. `finally` runs in every case, so cleanup placed there cannot be missed.
○ Because the checker requires cleanup in `finally`.
→ Not quite. The checker doesn't require it. The reason is reliability.
```
