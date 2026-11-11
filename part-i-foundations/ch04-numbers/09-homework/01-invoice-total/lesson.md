# Homework: invoice total

A small invoice, a tax rate, and a total that has to be right to the cent. Solve it in your own file, and only then compare your answer with the solution.

> **Coming from JavaScript:** the arithmetic and `toFixed` are the same in both languages. The `: number` labels are the TypeScript part.

## The task

An invoice has two items. The first costs `19.99`, and the second costs `24.50`. Sales tax is 8.25%, applied to the subtotal.

Here is the starting code, which adds the two prices:

```ts
const first: number = 19.99;
const second: number = 24.5;

console.log(first + second);
```

Start from the code above, in your own file, and change it so that:

1. it works out the tax, which is 8.25% of the subtotal,
2. it works out the total, which is the subtotal plus the tax, and
3. it prints the total with exactly two decimal places, in this form: `Total: 48.16`.

## Hints

- Write 8.25% as a decimal, which is `0.0825`.
- The total is a decimal, so use `toFixed(2)` to show it to two places.
- Keep the calculation in numbers, and only convert to text at the end, when you print it.

## When you're stuck

Show the solution. It's a spoiler, so give it a proper attempt in your own file first.

## Quiz

```quiz
Why is the tax rate written as `0.0825`, rather than `8.25`?
○ Because `8.25` is text, so it can't be used in a calculation.
→ Not quite. `8.25` is a number. The problem is its size.
◉ Because a percentage is a fraction of the whole, so 8.25% is 0.0825 of it.
→ Right. Multiplying by 0.0825 takes 8.25% of the subtotal.
○ Because the checker only accepts rates below one.
→ Not quite. The checker doesn't set that limit. The reason is what the percentage means.
```
