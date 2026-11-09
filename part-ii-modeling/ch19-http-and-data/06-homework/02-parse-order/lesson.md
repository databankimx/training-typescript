# Homework: parse order

An order arrives from a web service as JSON text. The program needs its `id` and its `total`, and it must not use the order until both are confirmed. The exercise writes a type guard for the order's shape, and prints the order only when the guard accepts it.

> **Coming from JavaScript:** `JSON.parse` and the `typeof` and `in` checks work the same way in both languages. The `interface Order` and the `value is Order` return type are the TypeScript part.

## The task

Here is the starting code, which parses the order and prints it as it arrived:

```ts
const data: unknown = JSON.parse('{"id":7,"total":35}');

console.log(data);
```

Start from the code above, in your own file. Write an interface `Order` with an `id` and a `total`, both numbers. Write a type guard `isOrder(value: unknown): value is Order` that checks each property is present and has the type `number`. If the data passes the guard, print `Order 7: 35`, using the `id` and the `total` from the order. Otherwise print `invalid order`. The output should be:

```
Order 7: 35
```

## Hints

- Check each property with `in` and `typeof`, as in the checking data step.
- Inside the `if`, the checker treats the data as an `Order`, so the properties can be read.

## When you're stuck

Show the solution. It's a spoiler, so give it a proper attempt in your own file first.

## Quiz

```quiz
Why check the types of `id` and `total`, rather than only that they exist?
○ Because the checker cannot read numbers from JSON.
→ Not quite. The checker can read them. The concern is what the data contains.
◉ Because a property can exist with the wrong type, such as text where a number is needed.
→ Right. The guard must confirm the type, not only the presence, before the program relies on it.
○ Because `total` is always a text value.
→ Not quite. In this order it's a number, and the guard checks for that.
```
