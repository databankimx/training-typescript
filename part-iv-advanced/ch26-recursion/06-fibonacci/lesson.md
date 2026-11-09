# Fibonacci and repeated work

The Fibonacci sequence starts 0, 1, and then each number is the sum of the two before it. Its definition is recursive, so writing it recursively is tempting. The version in this step works, and it also shows a cost that is easy to miss.

> **Coming from JavaScript:** the function and the counter are the same in both languages. The `let calls: number` label is the TypeScript part, and it documents that the counter holds a whole number.

## The program

```typescript
let calls: number = 0;

function fib(n: number): number {
  calls = calls + 1;
  if (n < 2) {
    return n;
  }
  return fib(n - 1) + fib(n - 2);
}

console.log(fib(10));
console.log(`calls: ${calls}`);
```

```text
55
calls: 177
```

The answer for ten is 55, which is correct. The count of 177 calls is the surprise. `fib(10)` calls `fib(9)` and `fib(8)`, and `fib(9)` calls `fib(8)` again. The same values are computed many times, and the work grows much faster than the input.

## Why this matters

Each extra step in `n` roughly multiplies the work, so `fib(40)` needs hundreds of millions of calls. The recursion is correct, but the program repeats itself. This is the common trap with recursion over a branching definition: the structure of the problem is right, and the structure of the calls is wasteful.

The fix, which the advanced chapters on closures and memoisation show, is to remember each answer the first time it is computed. This step only names the cost.

## Try it yourself

- Print `fib(15)`, and watch how the call count grows.
- Change `n < 2` to `n < 1`. Does the answer change? What does the base case now return for `n = 1`?

## Quiz

```quiz
Why does `fib(10)` make 177 calls, not 10?
○ Because the counter counts the base cases twice.
→ Not quite. The count includes every call, and the same values are recomputed.
◉ Because each call makes two more calls, and the same smaller values are computed many times.
→ Right. The calls branch, so the work grows much faster than the input.
○ Because `fib` is called once for each digit of 10.
→ Not quite. The count depends on the branching, not on the digits.
```
