# Large integers with BigInt

Ordinary numbers store whole numbers exactly only up to 2⁵³, which is 9007199254740992. Beyond that, neighbouring integers collapse onto the same value. A `bigint` stores whole numbers of any size exactly, and it works with the same arithmetic operators, as long as both sides are `bigint`.

> **Coming from JavaScript:** BigInt is the same in both languages. The `bigint` label is the TypeScript part, and the checker refuses to mix a `bigint` with an ordinary number without a conversion.

## The program

```typescript
const big: bigint = 2n ** 64n;
console.log(big.toString());

const precise: bigint = 9007199254740993n;
console.log(precise.toString());

console.log(9007199254740993 === 9007199254740992);
```

```text
18446744073709551616
9007199254740993
true
```

- **The `n` suffix** marks a literal as a `bigint`. `2n ** 64n` is computed exactly.
- **`toString()`** prints every digit. Plain `console.log` on a bigint adds an `n`, which is why the program converts it first.
- **The last line** is `true` because the ordinary number `9007199254740993` cannot be stored exactly, so it becomes the same value as its neighbour.

## Mixing the two types

The checker refuses `2n + 1` and `2 + 1n`, because the two kinds of number are different types. Convert explicitly with `BigInt(x)` or `Number(x)`, and make sure the conversion is safe for the value you hold.

## Try it yourself

- Print `2n ** 100n`. How many digits does it have?
- Write `const mixed: bigint = 5n + 1;`, and press Check. What does the checker report?

## Quiz

```quiz
Why does `9007199254740993 === 9007199254740992` give `true`?
○ Because the two numbers are equal.
→ Not quite. They are different integers, but an ordinary number cannot store the difference.
◉ Because ordinary numbers cannot store integers beyond 2 to the power 53 exactly.
→ Right. The first value rounds to the same number as the second, so the comparison holds.
○ Because `===` ignores large numbers.
→ Not quite. `===` compares the stored values, which are equal.
```
