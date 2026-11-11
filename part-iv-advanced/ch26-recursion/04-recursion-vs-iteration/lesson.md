# Recursion versus iteration

Any recursive function can be rewritten as a loop, and any loop can be rewritten as a recursive function. The choice is about clarity and about the limits of the runtime, not about what the program can compute. This step writes the same sum both ways, so you can compare them directly.

> **Coming from JavaScript:** both versions are identical in both languages. The typed `let total: number` and the `n: number` labels are the TypeScript part.

## Two versions of one sum

```typescript
function sumWithLoop(n: number): number {
  let total: number = 0;
  for (let value: number = 1; value <= n; value++) {
    total = total + value;
  }
  return total;
}

function sumWithRecursion(n: number): number {
  if (n === 0) {
    return 0;
  }
  return n + sumWithRecursion(n - 1);
}

console.log(sumWithLoop(5));
console.log(sumWithRecursion(5));
```

```text
15
15
```

The loop keeps one running total and changes it each time round. The recursion keeps no total at all: each call holds its own `n`, and the sum is assembled as the calls return.

## Choosing between them

Use the loop when the problem is a straight run through a sequence, because a loop uses constant space and reads plainly. Use recursion when the data itself has a nested shape, because the function then mirrors the structure. The next steps do exactly that.

Recursion has a depth limit. The `sumWithRecursion` call for a very large `n` would need that many waiting calls, and the program would hit the same stack error as in the base case step. The loop has no such limit.

## Try it yourself

- Change both calls to `sumWithLoop(100000)` and `sumWithRecursion(100000)`. Which one fails, and what is the error?
- Change `value <= n` to `value < n`. What does the loop now return for `n = 5`?

## Quiz

```quiz
Why does the recursive sum fail for a very large `n`, when the loop does not?
○ Because recursion cannot add numbers.
→ Not quite. Recursion adds numbers perfectly well.
◉ Because each call waits for the next, so the program keeps one waiting call per step.
→ Right. The waiting calls use the runtime's limited space, and the loop keeps only one total.
○ Because loops are always faster.
→ Not quite. Speed is not the difference here, and the failure is about depth.
```
