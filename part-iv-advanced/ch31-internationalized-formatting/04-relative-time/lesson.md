# Relative times

`Intl.RelativeTimeFormat` writes a difference in time as a phrase: `in 3 days`, or `3 days ago`. Setting `numeric: "auto"` allows the formatter to use the words a fluent reader would choose, such as `yesterday` and `tomorrow`, rather than the literal `1 day ago`.

> **Coming from JavaScript:** the formatter is identical in both languages. The `Intl.RelativeTimeFormat` label is the TypeScript part.

## The program

```typescript
const relative: Intl.RelativeTimeFormat = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

console.log(relative.format(-1, "day"));
console.log(relative.format(3, "day"));
console.log(relative.format(-3, "day"));
```

```text
yesterday
in 3 days
3 days ago
```

The first argument is the amount, and a negative amount means the past. The second names the unit, such as `"day"` or `"hour"`. With `numeric: "auto"`, the value `-1` in days becomes `yesterday`. Without that option, the output would be `1 day ago`.

## A note on "now"

The formatter does not know the current time. It only turns the amount you give it into words. Working out the amount, by subtracting two dates, is the program's job, and that calculation must use the same time zone as the rest of the page.

## Try it yourself

- Format `1` with the unit `"day"`. What is the output, and why does it say `tomorrow`?
- Remove `numeric: "auto"`, and format `-1` in days. What does the output say?

## Quiz

```quiz
Why does `format(-1, "day")` print `yesterday` when `numeric: "auto"` is set?
○ Because the formatter reads the current date.
→ Not quite. The formatter only turns the amount into words, and never reads the clock.
◉ Because `numeric: "auto"` allows the formatter to use the word a reader would expect for that amount.
→ Right. The option lets the locale choose words such as yesterday and tomorrow.
○ Because negative numbers are always written as words.
→ Not quite. Negative numbers are written as words only with the auto option.
```
