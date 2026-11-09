# Optional and read-only properties

Real data is not always complete. A product might have a discount, or might not. An identifier should never change once it's set. Two modifiers in an interface describe those rules: a question mark makes a property optional, and `readonly` stops it being changed after the object is created.

> **Coming from JavaScript:** `readonly` and the question mark are TypeScript-only. The checker reads them, and Node ignores them when the program runs.

## The program

The program is already in `main.ts`:

```ts
interface Product {
  readonly sku: string;
  name: string;
  discount?: number;
}

const mug: Product = { sku: "MUG-01", name: "Mug" };

console.log(mug.name);
console.log(mug.discount ?? 0);
```

Press **Run**. You should see:

```
Mug
0
```

- **`readonly sku: string`** means the SKU can be set when the product is created, but not changed after that. An SKU is an identifier, so changing it would break every record that refers to it.
- **`discount?: number`** is optional. The `mug` has no discount, so the object doesn't need the property. Reading it gives `undefined`, which the `??` turns into `0`.

The `mug` object leaves out `discount`, and the checker accepts that because the question mark allows it. A property without a question mark must always be present.

## Read-only means read-only

Try to change the SKU, and the checker refuses. The rule is about the property, not the object: the object's other properties can still change, but `sku` is fixed once it's set. Chapter 15 covers read-only types more fully, including `Readonly`, which makes a whole object read-only at once.

## Try it

- Set `mug.discount = 2;`, and press **Check**. Does the checker accept it? Why?
- Set `mug.sku = "MUG-02";`, and press **Check**. What does it say?
- Remove `name: "Mug"` from `mug`, and press **Check**. Why is this reported when `discount` was allowed to be missing?

## Quiz

```quiz
What does a question mark after a property name, as in `discount?: number`, allow?
○ The property can hold text.
→ Not quite. The `number` label still says the value is a number.
◉ The property can be left out of the object.
→ Right. The question mark makes the property optional.
○ The property can be changed after creation.
→ Not quite. That's what `readonly` controls, and the question mark does not change it.
```

```quiz
Why is `readonly` useful for an identifier such as a SKU?
○ Because it makes the identifier faster to read.
→ Not quite. `readonly` is about changes, not speed.
◉ Because the identifier can't be changed by accident after the product is created.
→ Right. Anything that refers to the SKU stays valid, because the SKU never changes.
○ Because it stops the identifier from being printed.
→ Not quite. A read-only property can still be printed.
```
