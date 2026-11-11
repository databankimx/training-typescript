# Narrowing unknown values

An `unknown` value becomes usable once you prove what it is. Inside an `if` that checks the type, the checker narrows the value, just as it did with unions in the last chapter. For objects, the check is a little more involved: you confirm the shape the program needs, and the checker accepts the value as that shape.

> **Coming from JavaScript:** `typeof` and the `in` operator work the same way in both languages. The `value is { name: string }` return type on the checking function is the TypeScript part, and the checker uses it to narrow.

## The program

The program is already in `main.ts`:

```ts
function describe(input: unknown): string {
  if (typeof input === "string") {
    return `text of length ${input.length}`;
  }
  if (typeof input === "number") {
    return `number ${input.toFixed(1)}`;
  }
  return "something else";
}

function isUser(value: unknown): value is { name: string } {
  return typeof value === "object" && value !== null && "name" in value;
}

console.log(describe("hello"));
console.log(describe(3.14159));
console.log(describe(null));

const incoming: unknown = { name: "Ada" };
if (isUser(incoming)) {
  console.log(incoming.name);
}
```

Press **Run**. You should see:

```
text of length 5
number 3.1
something else
Ada
```

The first function narrows with `typeof`, just as the union chapter did. Inside each `if`, the checker allows that type's operations, and `null` falls through to the final return, because `typeof null` is `"object"`, which neither check accepts.

The second function is a **type guard**. Its return type `value is { name: string }` tells the checker that, when the function returns `true`, the value has a `name` property that is text. The check itself is the work: `typeof value === "object"` rules out most values, `value !== null` rules out `null`, and `"name" in value` confirms the property exists. The `if (isUser(incoming))` block then uses `incoming.name` safely.

## Why the check matters

Data from outside the program is only as reliable as the checks you make on it. A type guard turns a hopeful guess into a proof the checker can follow. Without it, `incoming.name` would be refused, because the checker can't see that `name` exists.

## Try it

- Call `describe(true)`, and add it to the program. What's printed?
- Remove `value !== null` from `isUser`, and press **Check**. What does the checker report about the `in` check, and why?
- Change `incoming` to `{ city: "Dallas" }`, and run. Why is nothing printed?

## Quiz

```quiz
What does `typeof null` give you in JavaScript and TypeScript?
○ `"null"`
→ Not quite. That's the word, not what `typeof` returns.
◉ `"object"`
→ Right. It's a long-standing quirk of the language, which is why `null` needs its own check.
○ `"undefined"`
→ Not quite. `null` and `undefined` are different values, and `typeof` reports `null` as an object.
```

```quiz
After `if (isUser(incoming)) { ... }`, what does the checker know about `incoming`?
○ Nothing. The guard has no effect on the checker.
→ Not quite. The guard's return type is what narrows the value.
◉ It has a `name` property that is text, so `incoming.name` is allowed.
→ Right. The `value is { name: string }` return type tells the checker the shape, when the guard returns `true`.
○ It is `null`.
→ Not quite. The guard only returns `true` for values with the required shape.
```
