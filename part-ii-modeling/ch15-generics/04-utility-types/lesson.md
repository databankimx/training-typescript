# Utility types

Writing a new interface that is almost the same as an existing one is error-prone: a change to the original has to be copied by hand. The **utility types** are built into TypeScript, and each takes an existing type and returns a changed version. Three of the most useful are `Readonly`, `Partial`, and `Pick`.

> **Coming from JavaScript:** utility types are TypeScript-only, and they exist only for the checker. The program runs the same without them.

## The program

The program is already in `main.ts`:

```ts
interface Product {
  sku: string;
  name: string;
  price: number;
}

const mug: Product = { sku: "MUG-01", name: "Mug", price: 12 };

const frozen: Readonly<Product> = mug;
const update: Partial<Product> = { price: 10 };
const summary: Pick<Product, "sku" | "name"> = { sku: mug.sku, name: mug.name };

console.log(frozen.price);
console.log(`${summary.sku}: ${summary.name} at ${update.price ?? mug.price}`);
```

Press **Run**. You should see:

```
12
MUG-01: Mug at 10
```

Each utility type builds a new type from `Product`:

- **`Readonly<Product>`** has the same properties, each marked read-only. `frozen` can be read, but the checker refuses any change to its properties.
- **`Partial<Product>`** has the same properties, each optional. `update` holds just the price, which is allowed, because the others are optional.
- **`Pick<Product, "sku" | "name">`** keeps only the named properties. `summary` holds the SKU and the name, and nothing else.

None of these copies the interface by hand. If `Product` gains a property, `Readonly` and `Partial` pick it up automatically, and `Pick` keeps working for the names it lists.

## Where they help

`Partial` suits an update that changes only some fields. `Pick` suits a summary, a list item, or a form that needs a subset of a record. `Readonly` suits a value that other code must not change. Each one describes what a value is for, which makes the code easier to read.

## Try it

- Write `frozen.price = 15;`, and press **Check**. What does the checker report?
- Write `const bad: Partial<Product> = { color: "red" };`, and press **Check**. Why is it refused?
- Write `const short: Pick<Product, "sku"> = { sku: "MUG-01" };`, then add `short.name` to the program, and press **Check**.

## Quiz

```quiz
What does `Partial<Product>` describe?
○ A product with some properties removed.
→ Not quite. `Partial` keeps every property, but makes each one optional.
◉ A product where every property is optional.
→ Right. `Partial` makes each property optional, so an object can include only some.
○ A product that can only be read.
→ Not quite. That's `Readonly`, which stops changes rather than making properties optional.
```

```quiz
Why use `Pick<Product, "sku" | "name">` rather than writing a new interface with two properties?
○ Because `Pick` runs faster.
→ Not quite. The reason is that the type stays in step with the original.
◉ Because the picked type updates automatically if the original's sku or name changes.
→ Right. A picked type follows the original, so there's no second copy to keep in step.
○ Because interfaces can't have two properties.
→ Not quite. Interfaces can have any number of properties.
```
