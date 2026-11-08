# Nested objects

Real data is rarely flat. An order has an ID, and it also has a buyer, and the buyer has a name and a city. You can put one object inside another, and the checker follows the shape all the way down.

> **Coming from JavaScript:** nested objects are the same in both languages. The nested label describes the inner shape, just as the outer one does.

## The program

The program is already in `main.ts`:

```ts
const order: { id: number; buyer: { name: string; city: string } } = {
  id: 1042,
  buyer: { name: "Ada", city: "Dallas" },
};

console.log(order.buyer.city);
console.log(order.id);
```

Press **Run**. You should see:

```
Dallas
1042
```

The `buyer` property holds another object, with its own properties. To reach the city, read `order.buyer` first, then read `city` from that object. Each dot takes you one level further in.

The label is nested in the same way. The outer braces describe the order, and the inner braces describe the buyer. If you misspell `city` in the label or the code, the checker reports the mistake, at the level where it happens.

## Reading deeply nested values

A value that might not be there needs care at every level. If `buyer` were missing, `order.buyer.city` would fail, because there's no `city` inside nothing. The optional chaining operator, `?.`, from the missing values chapter, stops the chain at the first missing level:

```ts
console.log(order.buyer?.city);
```

Use `?.` when a level in the chain might be missing. Don't use it everywhere, because it hides the cases where a value should always be there.

## Try it

- Add a `total` property to `order`, and print it. Remember to add it to the label too.
- Change `order.buyer.city` to `order.city`. What does the checker say?
- Write `const buyerName: string = order.buyer.name;` and print it. Then print `order.buyer` on its own. What appears?

## Quiz

```quiz
How do you reach the `city` inside `order`, when `order` has a `buyer` property holding an object with `city`?
○ `order.city`
→ Not quite. `city` isn't a property of `order`. It's inside `buyer`.
◉ `order.buyer.city`
→ Right. Each dot takes you one level further in.
○ `order["buyer", "city"]`
→ Not quite. Brackets take one name, not a list of names.
```

```quiz
Why use `?.` in `order.buyer?.city`?
○ To make the value a number.
→ Not quite. `?.` doesn't change the type of a value.
◉ To stop the chain safely if `buyer` is missing.
→ Right. If `buyer` is missing, the chain stops there, and doesn't try to read `city`.
○ To copy the object.
→ Not quite. `?.` reads a value, and doesn't make a copy.
```
