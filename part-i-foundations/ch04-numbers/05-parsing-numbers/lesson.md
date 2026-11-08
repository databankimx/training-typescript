# Turning text into numbers

Numbers often arrive as text, from forms, files, and the odd spreadsheet. Converting them is easy. The tricky part is what happens when the text isn't a number at all.

> **Coming from JavaScript:** `Number`, `parseInt`, `parseFloat`, and `NaN` work the same way in both languages.

## Why text needs converting

Values from a form arrive as text, even when they look like numbers. You can't calculate with `"42"` until you convert it. The checker warns you about this, and so does `console.log`, because `"42" + 1` joins the text instead of adding.

## Converting with `Number`

`Number` turns text into a number:

```ts
const text: string = "42";
const value: number = Number(text) + 1;
```

`Number(text)` is `42`, so `value` is `43`.

## Converting text with extra characters

`parseInt` and `parseFloat` read as much of the text as they can, from the start, and stop at the first character that isn't part of a number:

```ts
console.log(parseInt("12px", 10));
console.log(parseFloat("3.5kg"));
```

`parseInt("12px", 10)` gives `12`, and `parseFloat("3.5kg")` gives `3.5`. The `10` in `parseInt` says the digits are base 10. Always give it, so the program doesn't guess the base.

## When the text isn't a number

If the text can't be read as a number, the answer is `NaN`, which means "not a number":

```ts
console.log(Number("hello"));
```

`NaN` spreads through a calculation: any sum that includes it is `NaN` as well. Check for it when a value comes from outside your program, because a `NaN` can slip through quietly.

## Press Run

The program is already in `main.ts`. You should see:

```
43
12
3.5
NaN
```

## Try it

- Change `"42"` to `"forty-two"`, and run. What does `value` become?
- Use `parseInt("3.9", 10)`. Does it round, or cut off the decimal?
- Use `Number("")`. What do you get, and why might that surprise someone?

## Quiz

```quiz
What does `parseInt("12px", 10)` give you?
○ 12px
→ Not quite. The result is a number, so the letters are left out.
◉ 12
→ Right. `parseInt` reads the digits at the start, and stops at the letters.
○ NaN
→ Not quite. The text starts with digits, so there's a number to read.
```

```quiz
What does a calculation give if one of its numbers is `NaN`?
○ 0
→ Not quite. `NaN` doesn't turn into zero.
◉ NaN
→ Right. Once a value is `NaN`, the results that depend on it are `NaN` too.
○ An error that stops the program.
→ Not quite. JavaScript keeps going, which is why `NaN` can hide problems.
```
