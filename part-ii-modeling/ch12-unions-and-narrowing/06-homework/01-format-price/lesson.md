# Homework: format price

A checkout page shows prices with a dollar sign and two decimal places, such as `$12.00`. Some prices arrive as numbers from the catalog, and some arrive as text that has already been formatted by an older system. The formatter must accept both, and it's the union and the narrowing that let it do so safely.

> **Coming from JavaScript:** `typeof` and `toFixed` work the same way in both languages. The `number | string` label is the TypeScript part.

## The task

Here is the starting code, which prints a number:

```ts
const price: number = 12;

console.log(price);
```

Start from the code above, in your own file. Write a function `formatPrice` that takes a `number | string`. If the value is a number, return it with a dollar sign and exactly two decimal places. If it's already text, return the text unchanged. Print `formatPrice(12)`. The output should be:

```
$12.00
```

## Hints

- Use `typeof` to narrow the union before you call `toFixed`, because `toFixed` exists only on numbers.
- After the number case returns, the checker knows the value is text, so returning it directly is allowed.

## When you're stuck

Show the solution. It's a spoiler, so give it a proper attempt in your own file first.

## Quiz

```quiz
Why must the function narrow with `typeof` before calling `toFixed`?
○ Because `toFixed` is slow on text.
→ Not quite. The reason is the type, not speed.
◉ Because `toFixed` exists only on numbers, so the checker allows it only after the check.
→ Right. The narrowing tells the checker the value is a number at that point.
○ Because text cannot be returned from a function.
→ Not quite. A function can return text, and this one does.
```
