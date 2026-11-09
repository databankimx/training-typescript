# Map, filter, and reduce

Three methods cover most of the work done with arrays. `map` returns a new array with each item changed. `filter` returns a new array with only the items that pass a test. `reduce` combines every item into one value, using an accumulator that starts at the value you give. None of them changes the original array.

> **Coming from JavaScript:** the methods are the same in both languages. The function labels, such as `(price: number): boolean`, are the TypeScript part, and they make each callback's contract explicit.

## The program

```typescript
const prices: number[] = [4, 10, 3];

const doubled: number[] = prices.map((price: number): number => price * 2);
const large: number[] = doubled.filter((price: number): boolean => price > 7);
const total: number = large.reduce((sum: number, price: number): number => sum + price, 0);

console.log(large.join(", "));
console.log(total);
```

```text
8, 20
28
```

The original `prices` is still `4, 10, 3`. `map` produced `8, 20, 6`, `filter` kept the items above 7, leaving `8, 20`, and `reduce` added them starting from zero to give 28.

## Reading a pipeline

Each step returns an array the next step can use, so the code reads from top to bottom as a sequence of transformations. A loop that did the same work would mix the three jobs together, and this layout keeps each one visible.

## Try it yourself

- Change the filter threshold to 5, and check the list and the total.
- Use `reduce` to find the largest price, starting from `0`.

## Quiz

```quiz
Does `prices.map(...)` change the original `prices` array?
○ Yes, `map` replaces each item in place.
→ Not quite. `map` returns a new array, and the original is unchanged.
◉ No, it returns a new array, and `prices` keeps its values.
→ Right. The three methods never change the array they are called on.
○ Yes, but only when the callback returns a number.
→ Not quite. The original is never changed by these methods.
```
