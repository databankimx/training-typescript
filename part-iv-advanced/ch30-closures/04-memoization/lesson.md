# Memoization

Memoization remembers the result of a function for each input, so repeated calls with the same input skip the work. The cache is a `Map` kept inside a closure, so it is private to the memoized function. Callers use the new function exactly as they used the original.

> **Coming from JavaScript:** `Map` and the closure are the same in both languages. The `Map<number, number>` label and the `number | undefined` result of `get` are the TypeScript part, and they make the missing-entry case explicit.

## The program

```typescript
const cache: Map<number, number> = new Map<number, number>();
// ...
const remembered: number | undefined = cache.get(n);
if (remembered !== undefined) {
  return remembered;
}
```

```text
16 16 16
1
```

`slowSquare` ran once, the first time `fast(4)` was called. The next two calls found 16 in the cache and returned it straight away, so `calls` is 1. Printing `calls` after three calls is the easiest way to see the saving.

The check `remembered !== undefined` is what tells a cache hit from a miss. A cached result of zero would still count as a hit, because it is not `undefined`.

## When memoization pays off

It pays off when the work is expensive and the same inputs come back often. It costs memory, because every distinct input keeps an entry. A function whose inputs never repeat gains nothing from a cache, and only gets the extra memory.

## Try it yourself

- Call `fast(5)` once, then `fast(4)` again. What does `calls` show?
- Remove the `cache.set(n, result);` line, and run. What is `calls` now?

## Quiz

```quiz
Why is `remembered !== undefined` the test for a cache hit, rather than `if (remembered)`?
○ Because `if` cannot test numbers.
→ Not quite. `if` can test numbers, but the test would be wrong for some values.
◉ Because a cached result of zero is falsy, so a plain test would treat it as a miss.
→ Right. Comparing with `undefined` treats zero as a hit, as it should be.
○ Because `undefined` is faster to compare.
→ Not quite. The reason is correctness for zero.
```
