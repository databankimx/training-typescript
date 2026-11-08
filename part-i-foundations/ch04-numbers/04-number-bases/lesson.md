# Binary and hexadecimal numbers

Computers count in binary, and programmers often write numbers in hexadecimal because it's shorter. You don't need to think like a computer, but you do need to recognise both, because they turn up in flags, colours, and error codes.

> **Coming from JavaScript:** the `0b` and `0x` prefixes and `toString(base)` work the same way in both languages.

## Writing numbers in other bases

We normally count in base 10, with digits 0 to 9. Computers count in base 2 (binary, digits 0 and 1), and programmers often use base 16 (hexadecimal, digits 0 to 9 and then a to f). Both are useful for flags and colours, where each digit is a single on-or-off switch or a pair of values.

In your code, a prefix tells the program which base you mean:

```ts
const flags: number = 0b1010;
const mask: number = 0xff;
```

- **`0b`** means the digits that follow are binary. `0b1010` is the same number as `10`.
- **`0x`** means the digits that follow are hexadecimal. `0xff` is the same number as `255`.

## Converting a number to text in another base

`toString` gives you the number as text, written in the base you ask for:

```ts
console.log(flags.toString(2));
console.log(mask.toString(16));
```

`flags.toString(2)` gives `1010`, and `mask.toString(16)` gives `ff`. The result is text, so you can display it or join it with other text.

## Press Run

The program is already in `main.ts`. You should see:

```
10
255
1010
ff
```

The first two lines show the numbers in base 10, because that's how `console.log` prints a number. The last two show the same values as text, in base 2 and base 16.

## Try it

- Write `0b1111` and check its value. Then write it as `15` and compare.
- Use `toString(2)` on `8`. How many digits does the answer have?
- Use `toString(16)` on `10`. What single character do you get?

## Quiz

```quiz
What is `0b1010` as an ordinary number?
○ 1010
→ Not quite. The `0b` prefix says the digits are binary, so the number isn't 1010.
◉ 10
→ Right. Binary 1010 is 8 + 2, which is 10.
○ 1000
→ Not quite. That's binary for 8, not for 1010.
```

```quiz
What is `(255).toString(16)`?
○ 255
→ Not quite. That's the base 10 form, not the hexadecimal form.
◉ ff
→ Right. The hexadecimal digit f is 15, so ff is 15 times 16 plus 15, which is 255.
○ 16
→ Not quite. That's the base for the conversion, not the answer.
```
