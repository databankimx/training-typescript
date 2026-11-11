# Homework: running total

A shop wants to see the running total of a basket as each price is added, so the cashier can show it to the customer after every item. The total starts at zero, and it grows by one price on each pass.

> **Coming from JavaScript:** `for...of` and `+` work the same way in both languages. The `number[]` label is the TypeScript part.

## The task

Here is the starting code, which prints how many prices there are:

```ts
const prices: number[] = [5, 10, 3];

console.log(prices.length);
```

Start from the code above, in your own file, and change it so that it prints the running total after each price, one line per price. With these prices, the output should be:

```
5
15
18
```

## Hints

- Create a variable for the total before the loop, and give it a starting value of zero.
- Inside the loop, add the current price to the total, and then print the total.

## When you're stuck

Show the solution. It's a spoiler, so give it a proper attempt in your own file first.

## Quiz

```quiz
Why does the total start at `0`, rather than at the first price?
○ Because the checker requires zero.
→ Not quite. The checker doesn't set starting values.
◉ So that every price, including the first, is added in the same way inside the loop.
→ Right. Starting at zero lets the loop treat each price the same way.
○ Because zero is the only number that can be added to.
→ Not quite. Any number can be added to. Zero is the right starting point here because the total is empty before any price is added.
```
