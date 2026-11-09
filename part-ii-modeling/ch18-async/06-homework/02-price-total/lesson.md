# Homework: price total

A basket holds several items, and each item's price comes from a lookup that takes a little time. The total should wait for every lookup, but the lookups don't depend on each other, so they should start together. The exercise uses `Promise.all` for the lookups, and then adds the prices into one total.

> **Coming from JavaScript:** `Promise.all`, `map`, and `for...of` work the same way in both languages. The `number[]` label on the results is the TypeScript part.

## The task

Here is the starting code, which prints how many items the basket holds:

```ts
const items: string[] = ["mug", "plate"];

console.log(items.length);
```

Start from the code above, in your own file. The function `priceOf(name)` returns a promise of the name's length, to stand in for a real price lookup:

```ts
function priceOf(name: string): Promise<number> {
  return new Promise<number>((resolve) => {
    setTimeout(() => resolve(name.length), 20);
  });
}
```

Write an `async` function `total` that takes the list of items, starts a `priceOf` lookup for each, waits for all of them with `Promise.all`, and returns the sum of the prices. Print `total(items)`. With the basket above, the output should be:

```
8
```

## Hints

- `items.map(...)` can start one lookup per item, and gives a list of promises.
- `Promise.all` waits for that list and gives back the prices in order.

## When you're stuck

Show the solution. It's a spoiler, so give it a proper attempt in your own file first.

## Quiz

```quiz
Why use `Promise.all` here, rather than awaiting each lookup in a loop?
○ Because a loop cannot contain `await`.
→ Not quite. A loop can contain `await`. The question is whether the lookups must wait for each other.
◉ Because the lookups don't depend on each other, so starting them together saves time.
→ Right. The lookups overlap, so the total wait is about the slowest one.
○ Because `Promise.all` returns the sum directly.
→ Not quite. It returns the list of results, and the sum is still the program's job.
```
