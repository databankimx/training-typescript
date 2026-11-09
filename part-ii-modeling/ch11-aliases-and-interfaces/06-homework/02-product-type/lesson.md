# Homework: product type

A catalog gives each product a SKU, which is its stock code. The SKU identifies the product everywhere, so it must never change once a product is created. The catalog also wants the name and price in the same record. The exercise uses an alias for the SKU type, so the code says what the text is for.

> **Coming from JavaScript:** template strings are the same in both languages. The `type`, `interface`, and `readonly` lines are the TypeScript part.

## The task

Here is the starting code, which prints the SKU:

```ts
const sku: string = "MUG-01";

console.log(sku);
```

Start from the code above, in your own file. Name the type of a SKU with an alias called `Sku`, and write an interface `Product` with three properties: a read-only `sku`, a `name`, and a `price`. Create a mug with the SKU `"MUG-01"`, the name `"Mug"`, and the price `12`, and print:

```
MUG-01: Mug at 12
```

## Hints

- An alias can name the plain type `string`, as in `type Sku = string;`.
- Use `readonly` before the `sku` property, so it can't be changed after the product is created.

## When you're stuck

Show the solution. It's a spoiler, so give it a proper attempt in your own file first.

## Quiz

```quiz
Why use `readonly` for the `sku` property?
○ Because SKUs are always numbers.
→ Not quite. The alias says the SKU is text, and `readonly` is about changes.
◉ Because every record that refers to the product depends on the SKU never changing.
→ Right. A read-only SKU keeps every reference to the product valid.
○ Because `readonly` makes the SKU faster to print.
→ Not quite. `readonly` controls changes, not speed or printing.
```
