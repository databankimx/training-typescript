# Module boundaries

A module's boundary is the list of names it exports. Everything else in the file is private, and the rest of the program can't see it. This is how a module keeps its rules to itself: the tax rate here is an implementation detail, and the only thing other files need is the function that uses it.

> **Coming from JavaScript:** a module's private names are private in both languages, because they're simply not exported. The checker reports any attempt to import them.

## The files

`pricing.ts` keeps the tax rate private, and exports only the function that applies it:

```ts
const TAX_RATE: number = 0.25;

export function priceWithTax(price: number): number {
  return price + price * TAX_RATE;
}
```

`main.ts` imports the function, and nothing else:

```ts
import { priceWithTax } from "./pricing.ts";

console.log(priceWithTax(50));
```

Press **Run**. You should see `62.5`, which is `50` plus a quarter of `50`.

The rate `TAX_RATE` is used inside the module, so the function can apply it. No other file can read or change it. If the rate changed later, only `pricing.ts` would need editing, and every caller would pick up the new rule.

## What the checker refuses

Try to import the rate directly. The checker reports that `TAX_RATE` isn't exported, and it points at the import. That's the boundary doing its job: the name exists, but outside the module it's invisible.

## Try it

- Change `main.ts` to import `TAX_RATE`, and press **Check**. What does the checker report?
- Change `TAX_RATE` to `0.1` in `pricing.ts`, and run. Does `main.ts` need any change?
- Add an exported function `priceWithoutTax(price: number): number` to `pricing.ts`, and call it from `main.ts`.

## Quiz

```quiz
Why keep `TAX_RATE` unexported, when `priceWithTax` needs it?
○ Because unexported values run faster.
→ Not quite. The reason is control, not speed.
◉ So the rate can change in one place, and other files can't depend on it directly.
→ Right. Keeping the rule private lets the module change it without breaking any caller.
○ Because `TAX_RATE` is not a number.
→ Not quite. It is a number, and that isn't the reason it's private.
```

```quiz
What does the checker report when `main.ts` imports `TAX_RATE` from `pricing.ts`?
○ Nothing, because the import works at run time.
→ Not quite. The checker refuses the import before the program runs.
◉ That `TAX_RATE` is not exported, so the import is not allowed.
→ Right. A name must be exported before another file can import it.
○ That the rate is too high.
→ Not quite. The checker doesn't judge the value, only whether the import is allowed.
```
