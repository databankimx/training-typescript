# Generic types

A generic type works like a generic function, but for a type rather than a function. `type Box<T> = { value: T }` describes a container with one property, whose type is whatever the caller chooses. `Box<number>` holds a number, and `Box<string>` holds text. The shape of the box is the same in both cases, so it's written once.

> **Coming from JavaScript:** generic types are TypeScript-only, and they disappear when the program runs. The `<number>` and `<string>` are instructions to the checker.

## The program

The program is already in `main.ts`:

```ts
type Box<T> = { value: T };

const count: Box<number> = { value: 3 };
const label: Box<string> = { value: "items" };

console.log(`${count.value} ${label.value}`);
```

Press **Run**. You should see `3 items`.

The alias `Box<T>` names the shape once. Each use fills in `T`:

- **`Box<number>`** is an object with a `value` that must be a number, so `{ value: 3 }` is correct.
- **`Box<string>`** is an object with a `value` that must be text, so `{ value: "items" }` is correct.

The checker holds each box to its own type. If you wrote `{ value: "three" }` for `count`, the checker would report it, because `count` is a `Box<number>`.

## Generic classes and interfaces

The same pattern works for classes and interfaces. A `Stack<T>` class could hold items of any one type, and an `interface Repository<T>` could describe a store of any kind of record. The type parameter is written after the name, and used inside the braces in the same way.

## Try it

- Write `const wrong: Box<number> = { value: "three" };`, and press **Check**. What does the checker say?
- Write `const flag: Box<boolean> = { value: true };`, and print `flag.value`.
- Add a second property `label: string` to the `Box<T>` alias, and press **Check** on the two existing boxes. What does the checker report?

## Quiz

```quiz
What does `Box<string>` describe?
○ A box that holds any type of value.
→ Not quite. A `Box<string>` holds text, because the type parameter is set to `string`.
◉ A box whose `value` must be text.
→ Right. The type parameter is filled in with `string`, so the value must be text.
○ A list of strings.
→ Not quite. A `Box<string>` holds one value, not a list.
```

```quiz
Why write `type Box<T>` once, rather than a separate type for each kind of value?
○ Because separate types are not allowed.
→ Not quite. Separate types are allowed, but they repeat the same shape.
◉ Because the shape is the same for every kind of value, and only the type of `value` changes.
→ Right. The generic type describes the shape once, and the parameter fills in the part that varies.
○ Because the checker runs faster with one type.
→ Not quite. The reason is avoiding repeated shapes, not speed.
```
