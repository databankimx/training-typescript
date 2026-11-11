# Homework: shipping cost

A parcel service charges by weight: under 2 kg costs 5, from 2 kg up to and including 10 kg costs 10, and anything heavier costs 20. The shop calls this rule for every order, so the cost belongs in a function that takes a weight and returns a price.

> **Coming from JavaScript:** functions and `if` statements work the same way in both languages. The `: number` labels are the TypeScript part.

## The task

Here is the starting code, which prints a weight:

```ts
const weight: number = 4;

console.log(weight);
```

Start from the code above, in your own file. Write a function `shippingCost` that takes a weight and returns the cost, following the ranges above. Then print `shippingCost(4)`. With a weight of `4`, the output should be:

```
10
```

## Hints

- Check the lightest range first, then the next, then use the `else` for the rest.
- A function can return from inside each branch, so each branch can give its own value.

## When you're stuck

Show the solution. It's a spoiler, so give it a proper attempt in your own file first.

## Quiz

```quiz
Why does `shippingCost` need a `: number` label on its result?
○ Because the checker needs every function to be labeled.
→ Not quite. The label is about the result, and it's a promise, not a requirement on every function.
◉ So every caller knows the function gives back a number, and the checker can check its uses.
→ Right. The label is the promise the callers depend on.
○ Because the weight must be a number.
→ Not quite. That's the label on the parameter. The result label is a separate promise.
```
