# Homework: a price formatter

A shop shows prices in the currency the customer chooses, and the same amount must always look the same in the same currency. The exercise writes a `formatPrice` function that uses a named locale, and it creates one formatter per currency rather than one per price.

> **Coming from JavaScript:** `Intl.NumberFormat` and `Map` are the same in both languages. The `string` and `number` parameters, and the `Intl.NumberFormat | undefined` type of a cache lookup, are the TypeScript part.

## The task

Start from the starter `main.ts`, which prints the raw amount. Replace the body of `formatPrice` so it:

1. Returns the amount formatted as currency, using the `en-US` locale.
2. Keeps one formatter for each currency, in a `Map`, so a currency's formatter is created only once.

With the two calls in the starter, the output should be:

```text
€1,234.50
$1,234.50
```

## Hints

- `new Intl.NumberFormat("en-US", { style: "currency", currency })` makes the formatter, and `format(amount)` formats a value.
- Look up the currency in the map first. If it is missing, create the formatter and store it.

## Try it yourself

- Add a call for `"GBP"`. Does `en-US` show the pound sign?
- Format `0` in `"USD"`. How many decimal places appear?

## Quiz

```quiz
Why does the solution look up the currency in a map before creating a formatter?
○ Because a formatter cannot be created more than once.
→ Not quite. A formatter can be created again, but it wastes work.
◉ So each currency's formatter is created once, and later prices reuse it.
→ Right. The map keeps one formatter per currency for the life of the program.
○ Because the map sets the locale.
→ Not quite. The locale is named when the formatter is created.
```
