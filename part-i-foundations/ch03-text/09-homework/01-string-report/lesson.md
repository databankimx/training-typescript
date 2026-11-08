# Homework: string report

A title typed into a form has arrived with spaces at both ends. The fix is short, but the reasoning is the point. Solve it in your own file first.

> **Coming from JavaScript:** the methods are the same as in JavaScript. The `: string` labels are the TypeScript part.

## The task

A user typed a report title into a form, and it arrived with extra spaces at both ends: `"  monthly sales  "`.

Here is the starting code:

```ts
const title: string = "  monthly sales  ";

console.log(title);
```

Start from the code above, in your own file, and change it so that:

1. removes the spaces at both ends,
2. prints the title with its first letter in capitals, so the first line is `Monthly sales`, and
3. prints how many characters the cleaned title has, which is `13`.

## Hints

- `trim()` removes the spaces at both ends.
- `charAt(0)` gives the first character, and `slice(1)` gives everything after it.
- `length` gives the number of characters.

## When you're stuck

Show the solution. It's a spoiler, so give it a proper attempt in your own file first.

## Quiz

```quiz
Why trim the title before measuring it?
○ Because `length` doesn't work on text with spaces.
→ Not quite. `length` works on any text. The question is what the count should mean.
◉ Because the spaces at the ends aren't part of the title, so they shouldn't be counted.
→ Right. The cleaned title is the text the user meant.
○ Because trimming makes the text a number.
→ Not quite. Trimming leaves the text as text.
```
