# Return values

A function that calculates something should hand the answer back, so the caller can decide what to do with it. That's what `return` is for. Some functions do something without producing a result, such as printing a report. Those return `void`, which is the label for "nothing to hand back".

> **Coming from JavaScript:** `return` and `void` behave the same way in both languages. The `: number` and `: void` labels are the TypeScript part, and the checker uses them to check the callers.

## The program

The program is already in `main.ts`:

```ts
function total(prices: number[]): number {
  let sum: number = 0;
  for (const price of prices) {
    sum = sum + price;
  }
  return sum;
}

function logTotal(prices: number[]): void {
  console.log(`Total: ${total(prices)}`);
}

const basket: number[] = [4, 6, 10];

console.log(total(basket));
logTotal(basket);
```

Press **Run**. You should see:

```
20
Total: 20
```

The two functions do different jobs:

- **`total`** works out a number and returns it. Its label, `: number`, promises that the result is a number. The caller can store it, print it, or use it in another calculation.
- **`logTotal`** prints a report and returns nothing. Its label, `: void`, says so. There's no result to store, so writing `const x = logTotal(basket);` would store nothing useful.

`logTotal` calls `total` inside its message. A function can use another function's result in the same way as any other value.

## Why labels on results matter

The result label is a promise to every caller. If `total` were changed to return text by mistake, the checker would report the line that tries to use the result as a number. Without the label, that mistake could travel further before anyone noticed.

## Try it

- Change `total` so it returns `sum + 1`. Does the checker report anything? What does the output show?
- Write `const result: number = logTotal(basket);`, and press **Check**. What does the checker say about `void`?
- Add a function `average` that returns the total divided by the number of prices. Call it with `basket`.

## Quiz

```quiz
What does a function labeled `: void` give back to its caller?
○ `0`
→ Not quite. `void` means there's no value to give back, not zero.
◉ Nothing useful, so there is no result to store.
→ Right. A `void` function does its work, such as printing, and gives no value back.
○ The last line it printed.
→ Not quite. The output is shown on screen, but the function doesn't return it.
```

```quiz
Why is `: number` written after the parameter list of `total`?
○ Because the checker needs the parameter type written twice.
→ Not quite. The parameter has its own label, and this one is for the result.
◉ To promise every caller that the function returns a number.
→ Right. The result label is the promise the caller relies on.
○ Because `number` is the only type a function can return.
→ Not quite. A function can return text, a boolean, or any other type.
```
