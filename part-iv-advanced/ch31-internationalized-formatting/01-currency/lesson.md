# Formatting money

`Intl.NumberFormat` writes a number in the conventions of a locale. A locale is a language and region code such as `en-US` or `en-GB`. The currency option adds the right symbol and decimal places. The formatter is created once, with its settings, and then used for each value.

> **Coming from JavaScript:** `Intl.NumberFormat` is the same in both languages. The `Intl.NumberFormat` label on each formatter is the TypeScript part, and it tells the checker the object has a `format` method.

## The program

```typescript
const dollars: Intl.NumberFormat = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });
const pounds: Intl.NumberFormat = new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" });

console.log(dollars.format(1234.5));
console.log(pounds.format(1234.5));
```

```text
$1,234.50
£1,234.50
```

Both lines format the same amount. The symbol, the grouping comma, and the two decimal places come from the formatter, not from the code. Change the locale, and the separators can change too, which is why the locale is named rather than left to the machine.

## Create the formatter once

A formatter is an object, and creating one has a cost. Create it once at the top of the program, and reuse it for every value. Creating a new formatter inside a loop repeats that cost for every item.

## Try it yourself

- Change `"en-GB"` to `"de-DE"`, and use `"EUR"` as the currency. Compare the output with the `en-US` line.
- Format `0.5` with the dollar formatter. How many decimal places appear?

## Quiz

```quiz
Why is a number formatter created once and reused, rather than created inside a loop?
○ Because formatters cannot be used more than once.
→ Not quite. A formatter can be used many times.
◉ Because creating a formatter has a cost, and reusing one avoids paying it for every value.
→ Right. The settings are fixed when the formatter is made, so one object serves every value.
○ Because `format` changes the locale each time.
→ Not quite. The locale is fixed when the formatter is created.
```
