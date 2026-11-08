# Reading properties

An **object** is a set of named values, written between braces. Each named value is a **property**. You've already met objects in passing, when `console.log` or `Math` came up, but this is the first time you build one yourself.

> **Coming from JavaScript:** object literals and property access are the same in both languages. The `{ name: string; ... }` label after the name is the TypeScript part, and it describes the shape the object must have.

## The program

The program is already in `main.ts`:

```ts
const customer: { name: string; city: string; age: number } = {
  name: "Ada",
  city: "Dallas",
  age: 36,
};

console.log(customer.name);
console.log(customer["city"]);
```

Press **Run**. You should see:

```
Ada
Dallas
```

Here's how the object is built:

- **The braces** `{ }` hold the whole object.
- **Each property** is a name, a colon, and a value, such as `name: "Ada"`. Properties are separated by commas.
- **The label** after `customer` describes the shape: three named properties, each with its type.

## Two ways to read a property

- **`customer.name`** uses a dot and the name. It's the usual form, when you know the name when you write the code.
- **`customer["city"]`** uses brackets and the name as text. It's useful when the name is stored in another variable, or when it's not a valid name for a dot.

Both give the same answer. The dot is shorter, and brackets are more flexible.

## Missing names

Ask an object for a property it doesn't have, and the answer is `undefined`. The checker knows the shape, though. If the label says the object has no `zip` property, a line such as `customer.zip` is reported as a mistake before the program runs. That's a useful protection, and the next step shows how to add properties deliberately.

## Try it

- Add `console.log(customer.age);` to the program. What's printed?
- Change `customer["city"]` to `customer.city`. Does the output change?
- Write `console.log(customer.zip);`, and press **Check**. What does the checker say?

## Quiz

```quiz
What does `customer.name` give you, if the object's `name` property holds `"Ada"`?
○ `name`
→ Not quite. That's the name of the property, not its value.
◉ `"Ada"`
→ Right. The dot reads the value stored under that property name.
○ `customer`
→ Not quite. That's the whole object, not one of its properties.
```

```quiz
Which of these reads the `city` property, when the name is written in the code?
○ `customer["City"]`
→ Not quite. Property names are case-sensitive, so `City` is a different name from `city`.
◉ `customer.city`
→ Right. The dot reads the property whose name is written after it.
○ `customer(city)`
→ Not quite. Parentheses call a function. They don't read a property.
```
