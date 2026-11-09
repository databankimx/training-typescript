# AND, OR, XOR, and NOT

The logical operators work position by position. `&` gives a 1 only where both bits are 1. `|` gives a 1 where either bit is 1. `^` gives a 1 where the bits differ. `~` flips every bit.

> **Coming from JavaScript:** the operators are identical in both languages. The `number` labels are the TypeScript part, and they document that these operators take whole numbers.

## Working one position at a time

For 12 (`1100`) and 10 (`1010`):

```text
  1100   12
& 1010   10
------
  1000    8     AND: 1 only where both are 1

  1100   12
| 1010   10
------
  1110   14     OR: 1 where either is 1

  1100   12
^ 1010   10
------
  0110    6     XOR: 1 where the bits differ
```

The printed results are the same values:

```typescript
console.log(a & b);
console.log(a | b);
console.log(a ^ b);
console.log(~5);
```

```text
8
14
6
-6
```

`~5` is `-6`. Bitwise NOT flips every bit of 5, and the result is read as a signed 32-bit number. It always equals `-(n + 1)`, which is worth remembering as a check.

## Try it yourself

- Work out `6 & 3` on paper before you run it. What do you expect?
- Show that `a ^ b ^ b` equals `a`. Why does XOR with the same value twice undo itself?

## Quiz

```quiz
What is `12 & 10`?
○ 14
→ Not quite. That is `12 | 10`, which takes a 1 where either bit is one.
◉ 8
→ Right. Only the bit worth 8 is set in both numbers.
○ 6
→ Not quite. That is `12 ^ 10`, which takes a 1 where the bits differ.
```
