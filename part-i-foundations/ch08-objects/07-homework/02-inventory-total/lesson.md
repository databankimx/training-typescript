# Homework: inventory total

A shop keeps its stock as a record, with one entry for each product and the number of items on the shelf. The manager wants to know the total number of items across every product, and the list of products will change over time, so the total can't rely on the names.

> **Coming from JavaScript:** `Object.values` and `for...of` work the same way in both languages. The `Record<string, number>` label is the same record type from the Object types and records step.

## The task

Here is the starting code, which prints the number of apples:

```ts
const stock: Record<string, number> = { apples: 3, pears: 4 };

console.log(stock.apples);
```

Start from the code above, in your own file, and change it so that it prints the total number of items across all products. With these values, the output should be:

```
7
```

Don't write the total by hand, and don't name `apples` or `pears` in the loop. The total must come from the values in the record, so it still works when a product is added.

## Hints

- `Object.values(stock)` gives the counts as a list.
- Start a total at zero, then add each count to it inside a loop over that list.

## When you're stuck

Show the solution. It's a spoiler, so give it a proper attempt in your own file first.

## Quiz

```quiz
Why use `Object.values(stock)`, rather than writing `stock.apples + stock.pears`?
○ Because `stock.apples + stock.pears` is always an error.
→ Not quite. That line works for these two products, but it breaks when the list changes.
◉ Because the total then works for any products in the record, including ones added later.
→ Right. Summing the values doesn't depend on which names are present.
○ Because `Object.values` is faster.
→ Not quite. The reason is that the total no longer depends on the names.
```
