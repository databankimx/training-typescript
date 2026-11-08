# Changing and formatting text

This step gathers a few handy tools for changing text: replacing a piece, splitting it apart, repeating it, and padding it to a width. You'll use them more often than you expect, usually in reports that need to line up.

> **Coming from JavaScript:** `replace`, `split`, `repeat`, `padStart`, and `String.raw` work the same way in both languages.

## Replacing part of text

`replace` finds the first matching piece of text and swaps it for something else. It gives back a new string, and the original is unchanged.

```ts
console.log(path.replace("sales", "returns"));
```

`replace` only changes the first match. If there might be more than one, the method `replaceAll` changes every match.

## Splitting text into pieces

`split` breaks text into a list of pieces, cutting at the character you give it. Each piece is a separate string, and the list is an **array**. Chapter 9 looks at arrays in detail, but for now it's enough to know that an array has a `length`, and that its pieces are numbered from `0`.

```ts
const parts: string[] = path.split("/");
console.log(parts.length);
console.log(parts[2]);
```

The text `reports/2026/sales.csv` has three pieces, so `length` is `3`. The piece at position `2` is `sales.csv`. The square brackets pick a piece out of the list by its position.

The label `string[]` says the list holds strings. That's the same kind of label as before, now applied to a list.

## Repeating text

`repeat` gives back the text repeated a given number of times:

```ts
console.log("=".repeat(10));
```

This prints ten equals signs. It's useful for drawing a line under a heading.

## Padding to a fixed width

`padStart` adds characters to the start of text until it reaches a width. Numbers in a table often look better when they line up, and `padStart` is how you make them do that.

```ts
console.log("7".padStart(3, "0"));
```

The text `7` is padded at the start, with `0`, until it has three characters. The result is `007`.

## Keeping backslashes as they are

Windows file paths use backslashes, and a backslash normally starts an escape. `String.raw` keeps every character exactly as you typed it:

```ts
console.log(String.raw`C:\new\folder`);
```

Without `String.raw`, `\n` would start a new line. With it, the path prints as `C:\new\folder`. The backticks around the text are what make `String.raw` work.

## Press Run

The program is already in `main.ts`. You should see:

```
reports/2026/returns.csv
3
sales.csv
==========
007
C:\new\folder
```

## Try it

- Change `"sales"` to `"returns"` in the `replace` line. What happens if the path has two words called `sales`?
- Change the `split` character to `"-"`, and split a name such as `"TS-2026-0042"`. How many pieces are there?
- Change `padStart(3, "0")` to `padStart(5, "0")`. What does `"7"` become?

## Quiz

```quiz
What does `"reports/2026/sales.csv".split("/")` give you?
○ One piece, the whole path.
→ Not quite. `split` cuts at every `/`, so there's more than one piece.
◉ A list of three pieces: `reports`, `2026`, and `sales.csv`.
→ Right. Each piece between the slashes becomes an item in the list.
○ The text with the slashes removed.
→ Not quite. `split` gives back a list, not a single string.
```

```quiz
What does `"7".padStart(3, "0")` give you?
○ 7
→ Not quite. Padding adds characters until the text reaches the width.
◉ 007
→ Right. Zeros are added at the start until there are three characters.
○ 700
→ Not quite. `padStart` adds to the start, not the end.
```

```quiz
What does `String.raw` do with a backslash?
○ It turns the backslash into a forward slash.
→ Not quite. The backslash stays a backslash.
◉ It keeps the backslash as typed, without starting an escape.
→ Right. The characters are kept exactly as they were written.
○ It removes the backslash.
→ Not quite. `String.raw` keeps every character, including backslashes.
```
