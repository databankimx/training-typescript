# Homework: stock lookup

A shop keeps its stock in a map, from product name to the number on the shelf. A product that isn't in the map has no entry at all. The shop's display shows `0` for those, not an empty space, so the lookup must give a number whether or not the product has an entry.

> **Coming from JavaScript:** `Map` and `??` work the same way in both languages. The `Map<string, number>` label is the TypeScript part.

## The task

Here is the starting code, which prints the number of apples:

```ts
const stock: Map<string, number> = new Map([["apples", 3]]);

console.log(stock.get("apples"));
```

Start from the code above, in your own file, and change it so that it prints the stock of `pears`. Pears aren't in the map, so the output should be:

```
0
```

## Hints

- `get` gives `undefined` for a key that isn't there.
- The `??` operator from the missing-values chapter gives a fallback for `undefined`.

## When you're stuck

Show the solution. It's a spoiler, so give it a proper attempt in your own file first.

## Quiz

```quiz
Why does `stock.get("pears")` give `undefined`, rather than `0`?
○ Because maps can't store numbers.
→ Not quite. The map does store numbers. The issue is the key `"pears"` isn't in it.
◉ Because a key with no entry gives `undefined`, and the program has to choose a fallback.
→ Right. The map doesn't invent a value, so the fallback is the program's decision.
○ Because pears are not a real product.
→ Not quite. The map simply has no entry for them.
```
