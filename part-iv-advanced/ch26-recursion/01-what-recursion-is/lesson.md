# What recursion is

A function that calls itself is recursive. Each call runs the same code with a different input, and it waits while the next call finishes. The `countdown` function below shows the pattern: it prints a number, then calls itself with one less.

> **Coming from JavaScript:** a recursive function is identical in both languages. The `from: number` label and the `: void` return type are the TypeScript part.

## The program

```typescript
function countdown(from: number): void {
  if (from === 0) {
    console.log("Liftoff");
    return;
  }
  console.log(from);
  countdown(from - 1);
}

countdown(3);
```

Press **Run**. You should see:

```text
3
2
1
Liftoff
```

Each call prints its number, then hands the work to a smaller call. The smallest call, with `from` equal to zero, prints `Liftoff` and returns. The calls finish in reverse order, but nothing is left for them to do after the nested call returns, so the output is in the order shown.

## Try it yourself

- Change `countdown(3)` to `countdown(5)`. How many lines are printed?
- Move `console.log(from);` below the recursive call. What order is the output in now, and why?

## Quiz

```quiz
What does `countdown(3)` do first?
○ It prints `Liftoff`.
→ Not quite. `Liftoff` is printed only when `from` is zero.
◉ It prints `3`, then calls `countdown(2)`.
→ Right. Each call prints its own value before handing the work to a smaller call.
○ It calls `countdown(4)`.
→ Not quite. The calls count down, so the next value is smaller.
```
