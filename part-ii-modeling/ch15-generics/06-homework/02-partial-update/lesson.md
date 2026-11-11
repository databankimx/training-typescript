# Homework: partial update

An order changes over time: its status moves from new to shipped, and later to delivered. Each change touches only some of the order's fields, so the update should accept a partial order, and return a complete one with the changes applied. `Partial` describes exactly that input.

> **Coming from JavaScript:** the spread syntax `{ ...order }` copies the properties of an object into a new one, and it works the same way in both languages. The `Partial<Order>` label is the TypeScript part.

## The task

Here is the starting code, which prints the order's status:

```ts
interface Order {
  id: number;
  status: string;
}

const order: Order = { id: 1, status: "new" };

console.log(order.status);
```

Start from the code above, in your own file. Write a function `applyUpdate` that takes an `Order` and a `Partial<Order>`, and returns a new `Order` with the changes applied. The three dots copy each property from the first object, and then from the second, so the changes win. Apply a status of `"shipped"` to the order, and print the new status. The output should be:

```
shipped
```

## Hints

- `{ ...order, ...changes }` builds the new order, with the changes applied last.
- The original `order` should not be changed, so the result is a new object.

## When you're stuck

Show the solution. It's a spoiler, so give it a proper attempt in your own file first.

## Quiz

```quiz
Why use `Partial<Order>` for the changes, rather than `Order`?
○ Because `Partial` makes the update run faster.
→ Not quite. The reason is what the input is allowed to contain.
◉ Because an update changes only some fields, so the other fields must be allowed to be missing.
→ Right. `Partial` allows the update to include just the fields that change.
○ Because `Order` can't be used as a parameter type.
→ Not quite. `Order` is a valid parameter type. `Partial` describes the update more accurately.
```
