# Homework: loyalty card

A shop gives each customer a loyalty card, which records their points. The card needs a `points` property that the current starting code doesn't have. The exercise is about adding it properly.

> **Coming from JavaScript:** adding a property to an object literal is the same in both languages. The label is the TypeScript part, and it must list every property the object has.

## The task

Here is the starting code, which prints the customer's name:

```ts
const customer = { name: "Ada", city: "Dallas" };

console.log(customer.name);
```

Start from the code above, in your own file. Add a `points` property with the value `120`, and change the program so that it prints:

```
Ada has 120 points
```

If you add a label to the object, it must include `points` too. Without a label, TypeScript works out the shape from the value you give it, so the new property is accepted.

## Hints

- Add `points: 120` inside the braces, after `city`.
- Give the object a label that lists `name`, `city`, and `points`, each with its type.

## When you're stuck

Show the solution. It's a spoiler, so give it a proper attempt in your own file first.

## Quiz

```quiz
Why does the checker refuse `points` if the label doesn't list it?
○ Because `points` is not a real word.
→ Not quite. The word is fine. The problem is that the shape doesn't include it.
◉ Because a fixed shape allows only the names it lists.
→ Right. A property that isn't in the label is outside the promise.
○ Because numbers can't be properties.
→ Not quite. Numbers can be property values, and the label simply has to say what the object holds.
```
