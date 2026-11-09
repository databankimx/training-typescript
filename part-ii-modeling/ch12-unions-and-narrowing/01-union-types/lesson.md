# Union types

A value often has more than one possible type. An ID from an older system might be a number, and a newer one might be text. A union type writes that down with a vertical bar: `string | number` means the value is text or a number, and nothing else. The checker then accepts either type, and refuses anything outside the list.

> **Coming from JavaScript:** a variable in JavaScript can hold any type at any time, so the union is the TypeScript part. Node ignores the `| number` label and runs the program the same way.

## The program

The program is already in `main.ts`:

```ts
let id: string | number = 42;

console.log(id);

id = "A-17";
console.log(id);
```

Press **Run**. You should see:

```
42
A-17
```

The label `string | number` means the variable may hold either kind. The first assignment stores a number, and the second stores text. Both are allowed, because both types are in the list.

A value outside the list is refused. If you wrote `id = true;`, the checker would report that a boolean can't be given to a `string | number`. The label is a promise that covers exactly the listed types, no more.

## A union isn't the same as "any"

A union limits the values to the listed types, and tells the checker what you're allowed to do with them. Because the checker doesn't yet know which type `id` holds at a given moment, it only allows operations that work for both types. The next step shows how to tell the types apart, so that more operations become available.

## Try it

- Write `id = true;`, and press **Check**. What does the checker report?
- Add `console.log(id.length);`, and press **Check**. Why is it reported, when `"A-17"` has a length?
- Change the label to `string | number | boolean`, and try `id = true;` again.

## Quiz

```quiz
What does the label `string | number` promise about a value?
○ It is exactly a string and a number at the same time.
→ Not quite. A union holds one of the listed types at a time, not both at once.
◉ It is either a string or a number, and nothing else.
→ Right. The vertical bar lists the types the value is allowed to have.
○ It can be any type at all.
→ Not quite. That's `any`, which the course covers in Chapter 13, and a union is narrower than that.
```

```quiz
Why does the checker refuse `id.length` when `id` is `string | number`?
○ Because `length` is not a real property.
→ Not quite. `length` is real, but it belongs to text, not to numbers.
◉ Because a number has no `length`, so the checker can't allow it for every value in the union.
→ Right. The checker only allows what works for every type in the union, until narrowing says more.
○ Because strings can't have a length.
→ Not quite. Strings do have a length, which is why the next step narrows the type first.
```
