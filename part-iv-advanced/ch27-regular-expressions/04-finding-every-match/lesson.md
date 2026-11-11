# Finding every match

A pattern without the `g` flag finds the first match and stops. With `g`, the same pattern finds every match in the text. Two methods do that job. `match` with `g` returns the matched text as an array of strings, and it throws away the captures. `matchAll` returns each match with its captures, which is what you need when a match has parts to read.

> **Coming from JavaScript:** `match`, `matchAll`, and the `g` flag are the same in both languages. The `string[]` label and the `?? []` fallback are the TypeScript part. `match` returns `null` when nothing matches, and the fallback keeps the type simple.

## The program

```typescript
const text: string = "Order 12 and order 7 shipped today.";

const numbers: string[] = text.match(/\d+/g) ?? [];
console.log(numbers.join(", "));

for (const found of text.matchAll(/order (\d+)/gi)) {
  console.log(found[1]);
}
```

```text
12, 7
12
7
```

The first line collects every run of digits. The loop uses `matchAll` on a pattern that captures the number after the word `order`, and `found[1]` is that capture. The `i` flag makes `order` match `Order` as well.

`matchAll` requires the `g` flag, and it throws an error without it. That is a useful thing to know when a function fails only with some patterns.

## Try it yourself

- Change `/order (\d+)/gi` to `/order (\d+)/i`, and run. What is printed, and why?
- Use `match` with `/order (\d+)/gi` instead. What does it return now, and where did the captures go?

## Quiz

```quiz
What does `text.match(/\d+/g)` return for the text above?
○ The first run of digits only, as one string.
→ Not quite. The `g` flag makes it return every match.
◉ Every run of digits, as an array of strings.
→ Right. `match` with `g` returns the matched text for each match.
○ The index where the first digit appears.
→ Not quite. That is what `search` returns. `match` returns the matched text.
```

```quiz
Why does `matchAll` need the `g` flag?
○ Because it makes the pattern case-insensitive.
→ Not quite. That is the `i` flag.
◉ Because `matchAll` finds every match, and without `g` it refuses to run.
→ Right. The method's name promises all matches, so the flag is required.
○ Because `g` makes the captures available.
→ Not quite. Captures are available with or without `g`, but `matchAll` requires it.
```
