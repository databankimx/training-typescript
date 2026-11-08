# Transforming arrays

Most of the time you don't want to change a list item by item. You want a new list built from the old one: every price doubled, only the cheap items kept, the first item that matches a rule. The array methods `map`, `filter`, and `find` do those jobs, and they read more clearly than a loop once you know them.

> **Coming from JavaScript:** these methods are the same in both languages. The `number[]` labels are the TypeScript part.

## The function you pass in

Each of these methods takes a small function, and calls it once for each item. The function is written inline, in the brackets, so the rule sits next to the method that uses it:

```ts
prices.map((p: number) => p * 2)
```

Read `(p: number) => p * 2` as "for each price `p`, give back `p * 2`". The arrow separates the input from the result. Chapter 10 covers these functions in full, so for now treat the rule as a sentence you can read.

## The program

The program is already in `main.ts`:

```ts
const prices: number[] = [4, 12, 7, 20];

const doubled: number[] = prices.map((p: number) => p * 2);
const cheap: number[] = prices.filter((p: number) => p < 10);

console.log(doubled.join(", "));
console.log(cheap.join(", "));
console.log(prices.includes(12));
console.log(prices.find((p: number) => p > 10));
```

Press **Run**. You should see:

```
8, 24, 14, 40
4, 7
true
12
```

- **`map`** gives a new list, the same length, with each item changed. The original list is unchanged.
- **`filter`** gives a new list with only the items that pass the test, here the prices under `10`.
- **`includes`** asks whether a value is in the list, and gives `true` or `false`.
- **`find`** gives the first item that passes the test, here `12`. If nothing passes, it gives `undefined`.

## Choosing the right method

Use `map` when every item becomes something new. Use `filter` when you want a subset. Use `find` when you want one item. Use `includes` when you only need a yes or no. Choosing well makes the intent visible to the next reader.

## Try it

- Change `p * 2` to `p + 1` in `doubled`, and run. What's printed?
- Change `filter`'s rule to `p > 10`. Which items remain?
- Change `find`'s rule to `p > 100`. What does the last line show?

## Quiz

```quiz
What is `prices.map((p: number) => p * 2)`, when `prices` is `[4, 12]`?
○ `[4, 12]`
→ Not quite. `map` changes each item, so the original values don't come back.
◉ `[8, 24]`
→ Right. Each price is doubled, and the result is a new list of the same length.
○ `[8, 12]`
→ Not quite. Both items are changed, not just the first.
```

```quiz
What does `find` give back when no item passes its test?
○ An empty list.
→ Not quite. `find` gives one item, or nothing.
◉ `undefined`.
→ Right. `find` returns `undefined` when no item matches.
○ `0`.
→ Not quite. `find` doesn't convert a missing match into a number.
```
