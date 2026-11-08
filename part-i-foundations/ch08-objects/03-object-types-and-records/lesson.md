# Object types and records

Every object has a shape, and TypeScript lets you write that shape down. There are two different ways to describe an object, and the difference between them is one of the most useful ideas in this chapter.

> **Coming from JavaScript:** the objects themselves are the same. A type is a description the checker reads. Node ignores it when the program runs.

## A fixed shape

The first way lists the properties, with a type for each:

```ts
const customer: { name: string; city: string; age: number } = {
  name: "Ada",
  city: "Dallas",
  age: 36,
};
```

This describes exactly one shape: an object with a `name`, a `city`, and an `age`. The checker holds you to it. A missing property, a misspelt one, or a value of the wrong type is reported as a mistake.

## A record

The second way describes an object whose names aren't known in advance:

```ts
const prices: Record<string, number> = { coffee: 3, bagel: 2 };
```

A **record** is an object that maps names to values, where the names can be anything. `Record<string, number>` reads as: the names are text (`string`), and each value is a number. The name `coffee` and the value `3` are one entry. The menu can have any number of entries, and new names can be added later.

Because the names are not fixed, the checker accepts a new one:

```ts
prices.tea = 2;
```

`tea` isn't in the object yet, but the record's label allows any text name with a number value. That's the difference. A fixed shape lists its names. A record allows any names, as long as each value has the right type.

## When to use which

Use a fixed shape when the object's properties are known, such as a customer with a name and an age. Use a record when the names come from data, such as the products in a shop or the words in a document.

## Press Run

The program is already in `main.ts`. You should see:

```
2
3
```

## Try it

- Write `prices.sandwich = "five";`, and press **Check**. What does the checker say about the value?
- Change `Record<string, number>` to `{ coffee: number; bagel: number }`, and press **Check** after writing `prices.tea = 2;`. Why does the checker now refuse it?
- Add another entry to `prices`, and check that the output still works.

## Quiz

```quiz
What does `Record<string, number>` describe?
○ An object with exactly two properties.
→ Not quite. The label allows any number of entries, as long as each name is text and each value is a number.
◉ An object whose names are text and whose values are numbers.
→ Right. A record allows any text names, with number values.
○ A list of numbers.
→ Not quite. A list has positions. A record has names.
```

```quiz
Why does the checker refuse `prices.tea = 2;` when the type is `{ coffee: number; bagel: number }`?
○ Because `tea` is too short a name.
→ Not quite. The length of the name isn't the problem.
◉ Because the fixed shape lists only `coffee` and `bagel`, so `tea` isn't allowed.
→ Right. A fixed shape allows only the names it lists.
○ Because the number `2` is not allowed.
→ Not quite. `2` is a number, which is the right type for the value.
```
