# Base cases and progress

Every recursive function needs two things. A **base case** is the input for which the function answers directly, without calling itself. **Progress** is the change each call makes so that it moves toward the base case. Without the base case, the calls never stop. Without progress, the base case is never reached.

> **Coming from JavaScript:** the function is the same in both languages. The checker does not verify that a recursion terminates. That is your job, and it is the most common error in recursive code.

## The program

```typescript
function countUp(current: number, limit: number): void {
  // The base case: once current passes limit, stop without calling again.
  if (current > limit) {
    return;
  }
  console.log(current);
  // Progress: each call moves current closer to limit.
  countUp(current + 1, limit);
}

countUp(1, 3);
```

```text
1
2
3
```

The base case is the `if` at the top. When `current` passes `limit`, the function returns without making another call. The progress is `current + 1`, which moves every call one step closer to that base case.

## What happens without a base case

Delete the `if` block, and run the program. The output is the same numbers, and then the program stops with an error:

```text
RangeError: Maximum call stack size exceeded
```

Each call waits for the next one, so the program keeps a record of every waiting call. With no base case, that record grows until the runtime's limit is reached. The error is the stopping point arriving too late.

## Try it yourself

- Change `countUp(1, 3)` to `countUp(4, 3)`. What is printed, and why?
- Change `current + 1` to `current - 1`, and run. What happens, and why does the base case never trigger?

## Quiz

```quiz
What is the purpose of a base case?
○ To make the function run faster.
→ Not quite. Its job is to stop the recursion, not to speed it up.
◉ To give an answer without another call, so the recursion stops.
→ Right. Every recursive path must eventually reach a case that does not call the function again.
○ To print the result.
→ Not quite. Printing is a separate job from stopping.
```

```quiz
Why does `current + 1` count as progress?
○ Because it makes the number larger.
→ Not quite. A larger number does not matter by itself.
◉ Because each call moves one step closer to the base case, so the recursion reaches it.
→ Right. Progress is the change that carries the calls toward the stopping point.
○ Because it stops the error.
→ Not quite. Progress is what avoids the error.
```
