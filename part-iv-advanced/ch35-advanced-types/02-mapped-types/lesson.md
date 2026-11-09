# Mapped types

A mapped type builds a new object type by looping over a set of keys. `{ [K in keyof T]: boolean }` says: for every key `K` of `T`, the new type has a property with the same name and the type `boolean`. The new type follows the original automatically, so adding a setting to `Settings` also adds a flag.

> **Coming from JavaScript:** there is no JavaScript version, because the mapping happens at compile time. The `Flags<Settings>` type is the TypeScript part.

## The program

```typescript
type Flags<T> = { [K in keyof T]: boolean };

interface Settings {
  darkMode: number;
  language: string;
}

const flags: Flags<Settings> = { darkMode: true, language: false };
console.log(flags.darkMode, flags.language);
```

```text
true false
```

`Flags<Settings>` has the properties `darkMode` and `language`, both typed `boolean`. The `darkMode` setting is a number in `Settings`, but its flag is a boolean in `Flags`, because the mapping replaces every property's type.

If you leave out `language` from `flags`, the checker reports the missing property. If you add `timezone: string;` to `Settings`, the checker requires a `timezone` flag too, with no change to `Flags`.

## Keeping types in step

A mapped type removes the need to write the same list of keys twice. That is the same benefit as the utility types from the generics chapter: the new type follows the original, so one change updates both.

## Try it yourself

- Write `const partial: Flags<Settings> = { darkMode: true };`, and press Check. What does the checker report?
- Add `timezone: string;` to `Settings`, and press Check on the existing `flags` line. Which property is reported now?

## Quiz

```quiz
Why does `darkMode` in `Settings` (a number) get a `boolean` flag in `Flags<Settings>`?
○ Because the mapping keeps each original property's type.
→ Not quite. The mapping replaces each property's type with the type written in the mapping.
◉ Because the mapped type says every property becomes `boolean`, whatever its original type.
→ Right. The original type of each property is not used by this mapping.
○ Because `Flags` converts numbers to booleans at run time.
→ Not quite. The conversion is a type-level rule, and no values change.
```
