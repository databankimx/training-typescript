# Homework: large sales

A shop records the value of every sale in a day. The manager wants the total of the large sales only, meaning those above 100, because the small ones are handled separately. The list of sales changes every day, so the program has to select the large ones rather than naming them.

> **Coming from JavaScript:** `filter` and `for...of` work the same way in both languages. The `number[]` label is the TypeScript part.

## The task

Here is the starting code, which prints how many sales there are:

```ts
const sales: number[] = [120, 45, 300, 80];

console.log(sales.length);
```

Start from the code above, in your own file, and change it so that it prints the total of the sales above 100. With these sales, the output should be:

```
420
```

## Hints

- `filter` can keep only the sales above 100.
- Add the kept sales to a total, starting at zero, with a loop.

## When you're stuck

Show the solution. It's a spoiler, so give it a proper attempt in your own file first.

## Quiz

```quiz
Why does the total come from `filter`'s result, rather than from the original list?
○ Because the original list can't be looped over.
→ Not quite. It can be looped over. The question is which items should be added.
◉ Because `filter` keeps only the sales that pass the test, so only those are added.
→ Right. The total should include only the large sales, and `filter` gives exactly those.
○ Because `filter` makes the list smaller on purpose.
→ Not quite. `filter` returns a new list. It doesn't change the original.
```
