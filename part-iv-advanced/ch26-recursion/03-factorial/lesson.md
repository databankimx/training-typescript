# Recursive factorial

The factorial of a number is the product of every whole number from one up to it: five factorial is `5 × 4 × 3 × 2 × 1`. That definition already contains a recursion. Five factorial is five times four factorial, and four factorial is four times three factorial, all the way down to one.

> **Coming from JavaScript:** the function is identical. The `n: number` and `: number` labels are the TypeScript part. A factorial of a large number is a very large number, and `number` loses precision above about 2^53, which the bitwise and integer chapters cover later.

## The program

```typescript
function factorial(n: number): number {
  if (n <= 1) {
    return 1;
  }
  return n * factorial(n - 1);
}

console.log(factorial(5));
console.log(factorial(10));
```

```text
120
3628800
```

The base case is `n <= 1`, which returns `1` without another call. The progress is `n - 1`. Each call waits for its smaller call to return a number, multiplies it by its own `n`, and returns that product. The multiplications happen on the way back up.

## Try it yourself

- Print `factorial(0)`. Why is the answer `1`, and does the base case cover it?
- Change `n <= 1` to `n === 1`, and print `factorial(0)`. What happens, and why?

## Quiz

```quiz
When does the multiplication `n * factorial(n - 1)` happen for `factorial(3)`?
○ Before any call to `factorial` is made.
→ Not quite. A call cannot multiply until its smaller call has returned.
◉ After `factorial(2)` returns, on the way back up from the smallest call.
→ Right. The results are combined as the calls return, not as they are made.
○ At the same time as the base case.
→ Not quite. The base case returns without multiplying.
```
