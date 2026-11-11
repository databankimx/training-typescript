# Homework: getter types

A small library wants a getter for every field of a record, so callers can read `person.name()` instead of `person.name`. Writing a getter by hand for each field is repetitive, and it would fall out of step when a field is added. A mapped type can describe the whole set from the record's own type.

> **Coming from JavaScript:** there is no JavaScript version, because the mapped type is compile-time only. The `Getters<T>` type is the TypeScript part.

## The task

The starter `main.ts` defines a `Getters<T>` placeholder, and it writes the two getters by hand so the program compiles. Replace the placeholder type with a mapped type, so that each key `K` of `T` becomes a function returning `T[K]`:

```typescript
type Getters<T> = { [K in keyof T]: () => T[K] };
```

Then write the `getters` object so it has the right return types. The output should be:

```text
Ada
36
```

## Hints

- `T[K]` is the type of the property named `K`, so each getter returns exactly its field's type.
- With the corrected type, the object literal must have a function for every key of `Person`, or the checker reports the missing one.

## Try it yourself

- Add `email: string;` to `Person`, and press Check. Which property of `getters` is reported?
- Change `age: (): number` to `age: (): string`. What does the checker report?

## Quiz

```quiz
Why does `Getters<T>` use `T[K]` rather than `unknown` for the return type?
○ Because `unknown` cannot be returned from a function.
→ Not quite. A function can return `unknown`.
◉ Because each getter should return the type of its own field, so callers keep the precise type.
→ Right. `T[K]` keeps each getter's result typed as its field.
○ Because `T[K]` is faster to check.
→ Not quite. The reason is precision, not speed.
```
