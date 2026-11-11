# Find the mistake before it runs

This one is yours. The checker will point at the mistake, and you'll fix it. The solution is there for comparison, once you've made a proper attempt, and not a moment before.

> **Coming from JavaScript:** the function is plain JavaScript. The `: number` labels are the part the checker reads.

## The task

The program below adds up the prices in a shopping cart. The prices came from a form on a web page, so they arrive as text.

Here is the starting code:

```ts
function cartTotal(prices: number[]): number {
  return prices.reduce((sum, price) => sum + price, 0);
}

console.log(cartTotal(["20", "5", "3"]));
```

Press **Check**. The checker finds the mistake. Read its message, and find the line it points to.

Start from the code above, in your own file, and change it so that:

1. **Check** reports no errors, and
2. the total is still correct. The prices `20`, `5`, and `3` should add up to `28`.

You're not allowed to change the `cartTotal` function's label. The fix belongs where the text arrives, not inside the function.

## Hints

- Remember which values the function expects. Look at the label on `prices`.
- Text can often be turned into a number with `Number(...)`, or with `.map(Number)` on a whole list.
- Once you have a fix, run it and check that the output is `28`.

## When you're stuck

Show the solution, which is a spoiler, and read it. You'll learn more by trying first, so give the task a proper attempt before you do.

## Quiz

```quiz
Where is the best place to turn the form's text into numbers?
○ Inside the `total` function, every time it runs.
→ That works, but it hides the problem. The function's promise is that it gets numbers, so the text should be converted before it arrives.
◉ Where the text arrives, before it's passed to the function.
→ Right. The function can then keep its promise, and every caller sends numbers.
○ Nowhere. The checker will change it for you.
→ Not quite. The checker reports the mistake, but it doesn't change your program.
```
