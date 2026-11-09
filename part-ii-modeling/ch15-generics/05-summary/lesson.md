## Summary: Generics

Generics let one definition serve many types, while the checker still tracks the type of each use.

* **A type parameter stands for a type the caller chooses.** `firstOf<T>` returns a `T` for a list of `T`.
* **A generic type fills in a shape.** `Box<number>` and `Box<string>` share one definition, and each holds its own type.
* **A constraint limits the type parameter.** `T extends { id: number }` lets the function rely on `id`.
* **Utility types derive new types from old ones.** `Readonly`, `Partial`, and `Pick` change an existing interface without copying it.

### Check your understanding

*These questions are written for this course.*

```quiz
What does `Partial<Settings>` give you, if `Settings` has `theme` and `fontSize`?
○ A type with only `theme`.
→ Not quite. `Partial` keeps both properties, and makes each one optional.
◉ A type with `theme` and `fontSize`, both optional.
→ Right. `Partial` makes every property optional, so a value may include some or all.
○ A type where `theme` and `fontSize` are read-only.
→ Not quite. That's `Readonly`.
```

```quiz
What does the constraint in `function label<T extends { name: string }>(item: T)` allow inside the function?
○ Any use of `item`, because `T` is generic.
→ Not quite. A generic `T` alone allows only the operations every type has.
◉ Reading `item.name`, because every allowed `T` has a text `name`.
→ Right. The constraint guarantees the property the function uses.
○ Calling `item` as a function.
→ Not quite. The constraint is about the `name` property, not calling.
```

```quiz
What does `Box<T>` describe when `T` is a type parameter?
○ One value that can only be a number.
→ Not quite. `T` is chosen by the caller, so it can be any type.
◉ A shape whose `value` has the type the caller chooses.
→ Right. The caller fills in `T`, and the checker holds the value to that type.
○ A list of every type in the program.
→ Not quite. `Box<T>` holds one value, of one chosen type.
```
