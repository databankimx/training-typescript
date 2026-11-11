# Groups and captures

Parentheses do two jobs. They group part of a pattern, so a quantifier can apply to it, and they **capture** the text that group matched. The captured text is available after the match, in the order the parentheses appear. A date in `YYYY-MM-DD` form has three captures: the year, the month, and the day.

> **Coming from JavaScript:** `exec` and the captured groups are the same in both languages. The `RegExpExecArray | null` label is the TypeScript part. It tells you that `exec` can return no match, and that a match behaves like an array of strings.

## The program

```typescript
const isoDate: RegExp = /^(\d{4})-(\d{2})-(\d{2})$/;

const match: RegExpExecArray | null = isoDate.exec("2026-11-09");

if (match !== null) {
  const [, year, month, day] = match;
  console.log(`${day}/${month}/${year}`);
}
```

```text
09/11/2026
```

`exec` returns `null` when nothing matches, which is why the variable is labelled `RegExpExecArray | null`, and the `if` checks it before anything else. When it matches, the result is an array. Index zero is the whole match, and indexes one to three are the three captures.

The destructuring `[, year, month, day]` skips index zero with the empty slot before `year`. Each captured value is a `string`, so `day` and `month` keep their leading zeros. Convert them with `Number` only when you need arithmetic.

## Try it yourself

- Print `match[0]`. What is in it, and how does it differ from the captures?
- Change the date to `2026-1-9`. What does `exec` return, and why?

## Quiz

```quiz
Why does the `if (match !== null)` check come before the destructuring?
○ Because destructuring is not allowed on arrays.
→ Not quite. Destructuring works on arrays.
◉ Because `exec` returns `null` when there is no match, and `null` cannot be destructured.
→ Right. The type says the result may be `null`, and the check narrows it to the match.
○ Because the captures are numbers, and must be checked first.
→ Not quite. The captures are strings.
```
