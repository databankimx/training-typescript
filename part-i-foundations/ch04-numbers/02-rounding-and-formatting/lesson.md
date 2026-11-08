# Rounding and formatting numbers

A calculation rarely produces the number you want to show. Rounding and formatting turn an accurate result into one a person can read, and the difference between rounding, flooring, and ceiling matters more than you'd expect.

> **Coming from JavaScript:** `Math.round`, `Math.floor`, `Math.ceil`, and `toFixed` work the same way in both languages.

## Rounding to a whole number

Most of the time a calculation gives you a decimal, and you need a whole number. `Math.round` moves a number to the nearest whole number:

```ts
console.log(Math.round(price));
```

`19.456` is closer to `19` than to `20`, so the result is `19`.

## Rounding up or down

`Math.floor` always rounds down, and `Math.ceil` always rounds up, even if the number is close to the next whole number:

```ts
console.log(Math.floor(price));
console.log(Math.ceil(price));
```

`floor` gives `19` and `ceil` gives `20`. When you're deciding how many boxes you need to hold some items, you round up. When you're counting complete laps, you round down.

## Showing decimal places

For money, you usually want exactly two decimal places. `toFixed` gives the number as text, with the places you ask for:

```ts
console.log(price.toFixed(2));
```

The result is `19.46`, which is `19.456` rounded to two places. `toFixed` gives back text, not a number, because the displayed value is for people to read. Chapter 3 covered text, and the checker will remember that the result is a string if you try to calculate with it.

## Press Run

The program is already in `main.ts`. You should see:

```
19
19.46
19
20
```

## Try it

- Change `price` to `19.5`. What does `Math.round` give now? Which way does it round a half?
- Use `toFixed(0)`. What does it show?
- Change `price` to `7.001`. What do `floor` and `ceil` give?

## Quiz

```quiz
What does `Math.round(19.456)` give you?
○ 19.46
→ Not quite. `round` gives a whole number. For two decimal places, use `toFixed(2)`.
◉ 19
→ Right. `19.456` is nearer to 19 than to 20.
○ 20
→ Not quite. That's `Math.ceil`, which always rounds up.
```

```quiz
Which function always rounds down, even when the decimal part is large?
○ Math.round
→ Not quite. `round` goes to the nearest whole number, so it can round up.
◉ Math.floor
→ Right. `floor` always goes down to the whole number below.
○ toFixed
→ Not quite. `toFixed` shows decimal places, and it doesn't change the number's size.
```
