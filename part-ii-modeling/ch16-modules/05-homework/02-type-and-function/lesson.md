# Homework: a type and a function

A product catalog stores each product's name and price, and a module formats them for display. The formatting function takes a `Product`, so the code that uses it needs the type as well as the function. The exercise imports both from the same module, using the two kinds of import the chapter described.

> **Coming from JavaScript:** importing a function is the same in both languages. Importing a type with `import type` is the TypeScript part.

## The task

The file `product.ts` in this folder exports an interface `Product` and a function `formatProduct`. Here is the starting code, which prints the product's name:

```ts
const mug = { name: "Mug", price: 12 };

console.log(mug.name);
```

Start from the code above, in your own file. Import the type `Product` with `import type`, and the function `formatProduct` with a normal import. Label `mug` as a `Product`, and print `formatProduct(mug)`. The output should be:

```
Mug: 12.00
```

## Hints

- Two import lines from the same file are allowed: one for the type, and one for the function.
- `formatProduct` shows the price with two decimal places, so you don't need to format it yourself.

## When you're stuck

Show the solution. It's a spoiler, so give it a proper attempt in your own file first.

## Quiz

```quiz
Why does `Product` need `import type`, while `formatProduct` needs a normal import?
○ Because `formatProduct` is written in lower case.
→ Not quite. The case of the name doesn't decide the kind of import.
◉ Because `Product` is an interface, which has no code, and `formatProduct` is a function, which does.
→ Right. A type-only import brings in the name for labels, while a function must be imported as code.
○ Because the function is longer.
→ Not quite. The length of the code doesn't decide the import.
```
