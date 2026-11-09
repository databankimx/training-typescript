# Bit patterns

A bit is a single zero or one. A whole number is a row of bits, and the position of each bit gives its value: 1, 2, 4, 8, and so on, doubling at each place. The number 13 is `1101`, which is 8 + 4 + 1.

> **Coming from JavaScript:** `toString(2)`, `parseInt`, and the `0b` literal are the same in both languages. The `number` label is the TypeScript part.

## The program

```typescript
const thirteen: number = 13;

console.log(thirteen.toString(2));
console.log(0b1101);
console.log(Number.parseInt("1101", 2));
```

```text
1101
13
13
```

`toString(2)` writes the number in base two. The literal `0b1101` is the same pattern written in the source, and `Number.parseInt` with base two reads the text back into a number. All three describe the value 13.

## Reading the positions

Read the pattern from the right. The rightmost bit is worth 1, the next 2, then 4, 8, and so on. A bit that is one adds its value to the total, and a zero adds nothing.

## Try it yourself

- Print `(255).toString(2)`. How many bits does it have, and why?
- Print `0b1000` and `0b1000 === 8`. What do you see?

## Quiz

```quiz
What is the value of the bit pattern `1010`?
○ 5
→ Not quite. The bits are worth 8, 4, 2, and 1, so the one on the left is 8, not 4.
◉ 10
→ Right. The one on the left is 8, and the one in the second position from the right is 2.
○ 1010
→ Not quite. That is the pattern itself, not its value.
```
