# Homework: use the tax module

A shop keeps its tax rule in a module, `tax.ts`, which is shared by every screen that shows a price. The rule belongs to the module, so the shop's pages import it rather than repeating the calculation. This exercise is about importing a function from a module and calling it.

> **Coming from JavaScript:** `import` and `export` work the same way in both languages. The `number` labels are the TypeScript part.

## The task

The file `tax.ts` in this folder exports a function `applyTax`, which adds tax to a price. Here is the starting code, which prints the price before tax:

```ts
const price: number = 80;

console.log(price);
```

Start from the code above, in your own file. Import `applyTax` from `./tax.ts`, and print the price with a tax rate of `0.25` added. With a price of `80`, the output should be:

```
100
```

## Hints

- The import line goes at the top of the file, and names the function in braces.
- `applyTax` takes the price and the rate, in that order.

## When you're stuck

Show the solution. It's a spoiler, so give it a proper attempt in your own file first.

## Quiz

```quiz
Why does the import line name `applyTax` in braces?
○ Because braces make the import run faster.
→ Not quite. Braces name which exported function is being imported.
◉ Because the name in braces must match the function's exported name exactly.
→ Right. The import finds the export by its name, so the spelling must match.
○ Because `applyTax` returns text.
→ Not quite. The braces are about the import, not the return value.
```
