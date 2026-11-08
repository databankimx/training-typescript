# Floating-point error and money

Computers store decimals in a way that's very nearly right, which is a dangerous kind of right. This step shows the problem and the usual fix for money, which is to stop storing money as decimals at all.

> **Coming from JavaScript:** the number system is the same in both languages. The rules for storing decimals are the same too.

## Why `0.1 + 0.2` isn't `0.3`

Computers store decimal numbers in binary, and many decimals can't be written exactly in binary. `0.1` is like `1/3` in ordinary decimal, which goes on forever. The computer stores the nearest value it can, and that value is very slightly off.

The first line of the program shows the effect:

```ts
console.log(0.1 + 0.2);
```

Press **Run**. The output is `0.30000000000000004`, not `0.3`. The difference is tiny, but it's real, and it's why you should never test two decimal results with `===` and expect them to match exactly.

This is called **floating-point error**. Most of the time it's too small to see. It matters when a program compares values, adds up many small amounts, or handles money.

## Keeping money exact

The safe way to handle money is to store it in whole units. In dollars, that's cents:

```ts
const cents: number = Math.round(0.1 * 100) + Math.round(0.2 * 100);
```

`0.1 * 100` is `10`, and `0.2 * 100` is `20`, both of which round to whole numbers. Adding whole numbers is exact, so `cents` is exactly `30`. Dividing by `100` at the end gives the dollar amount, `0.3`, and only the display of the final answer uses decimals.

## Press Run

The program is already in `main.ts`. You should see:

```
0.30000000000000004
30
0.3
```

## Try it

- Add `0.7 + 0.1` and check the result. Is it exact?
- Change the program to add `19.99` and `24.50` in cents. What total do you get, in cents and in dollars?
- Compare `0.1 + 0.2 === 0.3`. What does the checker say about the result?

## Quiz

```quiz
Why does `0.1 + 0.2` show `0.30000000000000004`?
○ JavaScript has a bug.
→ Not quite. The behaviour is by design, and every language that uses this kind of storage has it.
◉ Many decimal numbers can't be stored exactly in binary, so the sum is slightly off.
→ Right. The computer stores the nearest value it can, and small errors add up.
○ The checker added the extra digits.
→ Not quite. The checker doesn't change results. The program's arithmetic does.
```

```quiz
Why store money in cents, rather than dollars with decimals?
○ Because cents are easier to type.
→ Not quite. The reason is accuracy, not convenience.
◉ Because adding whole numbers is exact, so the totals don't drift.
→ Right. Whole-number arithmetic doesn't have the storage problem, so the total is exact.
○ Because the checker needs whole numbers.
→ Not quite. The checker accepts decimals. The reason is accuracy in the calculation.
```
