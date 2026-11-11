# Choosing between an alias and an interface

Both an alias and an interface can describe an object's shape, so beginners often ask which to use. The answer is that they differ in what else they can name, and in how they grow. An alias can name any type, including numbers, lists, and tuples. An interface names only object shapes, but it can be extended, and other interfaces can build on it.

> **Coming from JavaScript:** neither tool exists in JavaScript. Both are read only by the checker, and both are removed before the program runs.

## The program

The program is already in `main.ts`:

```ts
type Price = number;
type Tags = string[];

const price: Price = 12;
const tags: Tags = ["new", "sale"];

console.log(price, tags.join(", "));
```

Press **Run**. You should see `12 new, sale`.

These aliases name types that aren't objects:

- **`type Price = number;`** gives the name `Price` to the type `number`. The name says what the value means, so a price is easier to recognize than a bare number.
- **`type Tags = string[];`** names a list of text. Interfaces can't do this, because a list isn't an object shape.

## A practical rule

Use an **interface** for an object shape, especially one that other shapes will extend, such as `Customer` and `VipCustomer`. Use a **type alias** for everything else: a name for a number, a list, a tuple, or a shape that you won't extend. Either choice works for a simple object, so pick the one that reads best in the code around it, and be consistent within a project.

## Try it

- Write `type Quantity = number;`, and use it for a `quantity` value.
- Write `type Coordinates = [number, number];`, and create a value with two numbers.
- Write `interface Price { amount: number; }` in place of the alias. What happens to `const price: Price = 12;`, and why?

## Quiz

```quiz
Which kind of name can only an alias give, and not an interface?
○ An object shape with several properties.
→ Not quite. An interface can name an object shape like that.
◉ A name for a plain type, such as `number` or a list of text.
→ Right. Interfaces name only object shapes, so an alias is needed for other types.
○ A name that can be extended.
→ Not quite. Extension is the interface's strength, not the alias's.
```

```quiz
Why would you choose an interface for `Customer`, when `VipCustomer` must extend it?
○ Because interfaces run faster.
→ Not quite. Speed doesn't change how the checker reads them.
◉ Because an interface can be extended, and the extension keeps the shapes in step.
→ Right. Extending `Customer` keeps `VipCustomer` in step with any change to `Customer`.
○ Because only interfaces can have properties.
→ Not quite. Aliases can describe objects with properties too.
```
