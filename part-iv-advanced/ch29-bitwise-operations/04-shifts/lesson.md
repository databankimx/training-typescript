# Shifting bits

A shift moves every bit of a number a fixed number of places. `5 << 2` moves each bit two places to the left, which gives `10100`, or 20. Each left shift doubles the value, so `<< n` multiplies by two to the power `n`. `>>` moves bits to the right and divides, rounding down.

> **Coming from JavaScript:** the shift operators are the same in both languages. Shifts always work on 32-bit integers, which the next step explains in detail.

## The program

```typescript
console.log(5 << 2);
console.log(20 >> 2);
console.log(-20 >> 2);
```

```text
20
5
-5
```

- **`5 << 2`** moves the bits two places left. `101` becomes `10100`, which is 20.
- **`20 >> 2`** moves them two places right, giving `101`, which is 5.
- **`-20 >> 2`** also moves them right, and the sign bit is copied into the empty places. The result is `-5`, not a large positive number.

The right shift that keeps the sign is `>>`. Its partner `>>>` fills the empty places with zeros, which turns a negative number into a large positive one.

## Try it yourself

- Print `1 << 10`. What number is it, and why?
- Print `-20 >>> 2`. Why is the result so large?

## Quiz

```quiz
What does `7 << 3` give?
○ 10
→ Not quite. A shift by three multiplies by eight, not adds three.
◉ 56
→ Right. Shifting left by three multiplies by eight, and 7 × 8 is 56.
○ 21
→ Not quite. That is 7 times 3, which is a different operation.
```
