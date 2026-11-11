# Homework: order interface

A shop records each order with an ID and a total, and sometimes a note from the customer, such as "gift wrap". The note is optional, because most orders don't have one. The order record should say that in its interface, so the rest of the program can rely on it.

> **Coming from JavaScript:** the template string and `??` work the same way in both languages. The `interface` and the question mark are the TypeScript part.

## The task

Here is the starting code, which prints the order's total:

```ts
const order = { id: 1042, total: 35 };

console.log(order.total);
```

Start from the code above, in your own file. Write an interface `Order` with an `id` and a `total`, both numbers, and an optional `note`, which is text. Create the order with the note `"gift wrap"`, and print:

```
Order 1042: 35 (gift wrap)
```

## Hints

- The question mark on `note` makes it optional. The object can still include it, as this order does.
- `??` gives a fallback when a value is missing, which is useful for orders without a note.

## When you're stuck

Show the solution. It's a spoiler, so give it a proper attempt in your own file first.

## Quiz

```quiz
Why mark `note` with a question mark, rather than making every order have one?
○ Because notes are not text.
→ Not quite. A note is text. The question mark is about whether it must be there.
◉ Because most orders have no note, and the interface should allow that.
→ Right. The question mark describes what an order is allowed to contain.
○ Because the checker deletes notes it doesn't need.
→ Not quite. The checker doesn't change the data.
```
