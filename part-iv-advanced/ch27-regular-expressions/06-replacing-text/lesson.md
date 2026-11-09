# Replacing text

`replace` takes a pattern and a replacement, and it returns a new string with every match replaced. It never changes the original text, because strings cannot be changed in place. The replacement can be a fixed string, or a function that receives each match and returns the text to put in its place.

> **Coming from JavaScript:** `replace` is the same in both languages. The `(letter: string): string` label on the callback is the TypeScript part, and it tells the checker what the callback receives and returns.

## The program

```typescript
const isoDate: string = "2026-11-09";
console.log(isoDate.replace(/-/g, "/"));

const title: string = "hello world";
console.log(title.replace(/\b\w/g, (letter: string): string => letter.toUpperCase()));
```

```text
2026/11/09
Hello World
```

The first replacement uses the `g` flag, so every hyphen changes, not just the first. The second uses `\b`, which matches the start of a word, and `\w`, which matches a word character. The callback receives each matched letter and returns it in capitals.

## Why the function form

A fixed replacement cannot compute anything, but a function can. The function gets the matched text, and it can return different text depending on what it received. That is the mechanism behind a template that turns `{name}` into a real name, or a redaction that replaces each card number with asterisks.

## Try it yourself

- Remove the `g` flag from the first replacement. What changes?
- Change the callback to return `letter.toLowerCase()`. What does `title` become?

## Quiz

```quiz
Does `isoDate.replace(/-/g, "/")` change `isoDate`?
○ Yes, strings are changed in place.
→ Not quite. Strings cannot be changed in place, and `replace` returns a new string.
◉ No, it returns a new string, and `isoDate` keeps its hyphens.
→ Right. Strings are immutable, so the original value is unchanged.
○ Yes, but only when the `g` flag is present.
→ Not quite. The flag affects how many matches change, not whether the original is kept.
```
