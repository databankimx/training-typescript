# Unknown values

A value of type `unknown` can hold anything: a number, text, a list, an object, or nothing at all. The checker knows only that it's not yet known. That makes `unknown` the safe choice for a value from outside the program, because it doesn't pretend to know a type it hasn't checked.

> **Coming from JavaScript:** a JavaScript variable can hold any value, and nothing checks it. `unknown` is the TypeScript way of saying that out loud, and the checker enforces it.

## The program

The program is already in `main.ts`:

```ts
let value: unknown = "Ada";
console.log(typeof value);

value = 42;
console.log(typeof value);
```

Press **Run**. You should see:

```
string
number
```

The label `unknown` lets the variable hold text first and a number later. Both assignments are allowed, because `unknown` accepts every value. `typeof` is one of the few things you can ask of an `unknown` value without proving its type, because it works on any value.

## What the checker refuses

Almost everything else is refused. Calling a method, adding a number, or reading a property of an `unknown` value is a mistake, because the checker doesn't yet know the value has that method or property. The next step shows how to prove the type, so the operation becomes allowed.

## Try it

- Write `console.log(value.length);` at the bottom, and press **Check**. What does the checker say?
- Change `let value: unknown` to `let value: string`, and press **Check** after writing `value = 42;`. What's different about the message?
- Write `const doubled = value * 2;`, and press **Check**. What message does the checker give?

## Quiz

```quiz
Why does the checker refuse `value.length` when `value` is `unknown`?
○ Because `length` is not a real property.
→ Not quite. `length` is real, but the checker can't tell that this value has it.
◉ Because the checker doesn't yet know the value is text, so it can't allow text operations.
→ Right. An unknown value must be proven before an operation is allowed on it.
○ Because `unknown` values cannot be printed.
→ Not quite. `unknown` values can be printed. Only the operations are refused.
```

```quiz
Why is `typeof value` allowed on an `unknown` value, when `value.length` isn't?
○ Because `typeof` is a checker operation, not a program operation.
→ Not quite. `typeof` runs in the program, and works on any value.
◉ Because `typeof` works on any value, so the checker doesn't need the type first.
→ Right. `typeof` asks what the value is, so it's safe on every type.
○ Because the checker allows everything in the first line of a program.
→ Not quite. The line order doesn't change what's allowed.
```
