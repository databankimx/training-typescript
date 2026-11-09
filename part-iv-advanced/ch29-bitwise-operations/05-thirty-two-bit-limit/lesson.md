# The 32-bit limit

The bitwise operators do not work on the number you give them. They first convert it to a 32-bit signed integer, which holds values from -2147483648 to 2147483647. Anything outside that range wraps around, and the result is a value you may not expect.

> **Coming from JavaScript:** the conversion is the same in both languages. The `| 0` trick, which uses OR with zero to convert a number to a 32-bit integer, is a common idiom. The `number` label is the TypeScript part.

## The program

```typescript
console.log((2 ** 31) | 0);
console.log(2147483647 | 0);
console.log((2147483647 + 1) | 0);
```

```text
-2147483648
2147483647
-2147483648
```

The largest 32-bit value is 2147483647. Adding one to it does not give 2147483648 under `|`. Instead the top bit becomes a sign bit, and the number wraps to -2147483648, the most negative value. `2 ** 31` is also just past the limit, so it wraps the same way.

## What this means in practice

Use bitwise operators on values you know fit in 32 bits, such as flags, masks, and bytes. For larger integers, the operators silently produce wrong answers, and no error is reported. The next step covers the type that handles larger integers.

## Try it yourself

- Print `(2 ** 32) | 0`. What do you get, and why is it zero?
- Print `(-1) >>> 0`. What is the result, and what does `>>>` do to the sign?

## Quiz

```quiz
Why is `(2147483647 + 1) | 0` negative?
○ Because addition cannot produce a positive result.
→ Not quite. Addition works. The problem is the conversion afterwards.
◉ Because the value wraps past the largest 32-bit integer, and the top bit becomes a sign bit.
→ Right. The bitwise operator reads the result as a 32-bit signed integer, which wraps to the most negative value.
○ Because `|` always gives a negative result.
→ Not quite. With other operands, `|` gives positive results.
```
