# Cutting out part of text

**Before you start:** complete Searching text.

> **Coming from JavaScript:** `slice` works the same way in both languages.

## Cutting by position

`slice` takes out a piece of text, using two positions. The first position is where the piece starts. The second is where it stops, but the stopping character is not included.

```ts
const code: string = "TS-2026-0042";

console.log(code.slice(0, 2));
```

Positions start at `0`. The character at position `0` is `T`, and at position `1` is `S`. `slice(0, 2)` takes the characters from position `0` up to, but not including, position `2`. The result is `TS`.

## Counting from the end

If the position is negative, `slice` counts from the end instead. The last character is `-1`, the one before it is `-2`, and so on.

```ts
console.log(code.slice(-4));
```

`slice(-4)` takes the last four characters, which gives `0042`. You don't need to know how long the text is to do this, which makes it useful for things like file extensions and ID numbers.

## Press Run

The program is already in `main.ts`. You should see:

```
TS
2026
0042
```

## Try it

- Use `slice(3, 7)` on the code, and count the characters to see which ones it takes.
- Use `slice(-2)` to get the last two digits. What about `slice(-7)`?
- Use `slice(5)` with only one position. What does it give you?

## Quiz

```quiz
What does `"TS-2026-0042".slice(0, 2)` give back?
○ TS-
→ Not quite. The second position is where the cut stops, and it's not included.
◉ TS
→ Right. The cut takes positions 0 and 1, and stops before position 2.
○ T
→ Not quite. Both positions 0 and 1 are included, so the result has two characters.
```

```quiz
What does a negative position in `slice` mean?
○ The text is reversed.
→ Not quite. The text keeps its order. The negative position is counted from the end.
◉ The position is counted from the end of the text.
→ Right. `-1` is the last character, `-2` is the one before it, and so on.
○ An error happens.
→ Not quite. Negative positions are a normal part of `slice`.
```
