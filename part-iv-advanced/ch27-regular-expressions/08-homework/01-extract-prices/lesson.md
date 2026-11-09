# Homework: extract prices

A menu description mixes prices into ordinary sentences, and the till needs the prices as numbers so it can total them. The exercise uses `matchAll` and a capture group to pull each price out, and `Number` to turn the captured text into a value.

> **Coming from JavaScript:** `matchAll`, capture groups, and `Number` are the same in both languages. The `number[]` return type is the TypeScript part, and it promises the caller a list of numbers, not text.

## The task

Start from the starter `main.ts`, which prints the menu as it is:

```typescript
const menu: string = "Tea $3.50, cake $4";

console.log(menu);
```

Write a function `extractPrices(text: string): number[]` that:

1. Finds each dollar amount in the text. A price is a dollar sign followed by digits, with an optional decimal part. Use `matchAll` with the `g` flag.
2. Captures the digits and the decimal part, but not the dollar sign.
3. Converts each captured text to a number, and returns the list.

Print the prices from the menu, joined with a comma and a space. The output should be:

```text
3.5, 4
```

## Hints

- In a regular expression, `$` means the end of the text, so a dollar sign must be escaped as `\$`.
- The decimal part is optional, so a group that contains `\.\d+` should be followed by `?`.
- `Number("3.50")` is `3.5`, so the trailing zero disappears, which is what the output expects.

## Try it yourself

- Add a price with no decimal part and a price with two digits after the point. Does the function still find them?
- Remove the `\$` escape, and check what the pattern then matches.

## Quiz

```quiz
Why must the dollar sign be written as `\$` in the pattern?
○ Because `$` is not allowed in patterns.
→ Not quite. It is allowed, but it has a special meaning.
◉ Because an unescaped `$` means the end of the text, not a literal dollar sign.
→ Right. Escaping makes the character literal.
○ Because `\$` is faster to match.
→ Not quite. Speed is not the reason.
```
