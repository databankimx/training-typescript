# Homework: a call limiter

A rate limit lets a function run a fixed number of times, and then refuses further calls. The count must persist between calls, and it must belong to that one limiter, so two limiters never share a count. A closure is the natural place to keep it.

> **Coming from JavaScript:** the closure is the same in both languages. The `() => boolean` return type is the TypeScript part, and it says the limiter takes no arguments and answers yes or no.

## The task

Start from the starter `main.ts`, which has a placeholder that always refuses. Replace it with a real `makeLimiter(limit: number): () => boolean`:

1. Keep a count of calls in a variable inside `makeLimiter`.
2. Each call increases the count.
3. Return `true` while the count is no more than `limit`, and `false` after that.

With `makeLimiter(2)`, three calls should give:

```text
true true false
```

## Hints

- Increase the count before you compare it, so the first call is number 1.
- Each `makeLimiter` call should have its own count. Test that by making two limiters.

## Try it yourself

- Create a second limiter with a limit of 1, and call the two limiters alternately. Do they interfere?
- Change the comparison to `<`. Which call is refused first?

## Quiz

```quiz
Why does the count increase before the comparison in `calls++; return calls <= limit;`?
○ Because the comparison cannot use a variable.
→ Not quite. The comparison can use the variable.
◉ So that the first call is counted as call one, and `<= limit` allows exactly `limit` calls.
→ Right. Counting first makes the comparison match the number of calls made so far.
○ Because it makes the limiter faster.
→ Not quite. Speed is not the reason.
```
