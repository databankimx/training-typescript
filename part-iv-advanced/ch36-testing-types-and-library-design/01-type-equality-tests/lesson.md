# Type equality tests

Some changes to a type are silent: `string` becomes `string | undefined`, or a return type widens, and every caller still compiles. A **type equality test** turns those silent changes into errors. It is a type that resolves to `true` only when two types are identical, and a constant of that type fails the check when the types differ.

> **Coming from JavaScript:** there is no JavaScript version, because the test exists only in the checker. Node runs the program with the test removed, and only the printed line remains.

## The program

```typescript
type Equals<X, Y> = (<T>() => T extends X ? 1 : 2) extends (<T>() => T extends Y ? 1 : 2) ? true : false;

const sameNumber: Equals<number, number> = true;
const differentTypes: Equals<number, string> = false;

console.log("passed");
```

```text
passed
```

`Equals<number, number>` is `true`, so `sameNumber` is accepted. `Equals<number, string>` is `false`, and `differentTypes` is accepted as `false`. If you change the second line to `const differentTypes: Equals<number, string> = true;`, the checker reports an error, because the test now says the types are the same when they are not.

The trick compares two generic function types. TypeScript considers those identical only when the conditional types inside them match exactly, which is stricter than assignability.

## Why this is useful

Write one test per type that matters to your callers, and keep them in the same file as the library. When someone edits a type, the test fails in the check, and the change is noticed before it ships.

## Try it yourself

- Change `Equals<number, string>` to `Equals<string, string | undefined>`, and set its constant to `false`. Does the test pass?
- Change `Equals<number, number>` to `Equals<number, number | undefined>`, and keep the constant `true`. What does the checker report?

## Quiz

```quiz
Why does `Equals<number, number | undefined>` give `false`?
○ Because `undefined` is not a type.
→ Not quite. `undefined` is a type, and it can be part of a union.
◉ Because `number | undefined` is a different type from `number`, even though it contains `number`.
→ Right. The test checks for identity, not for containment.
○ Because the test only works with two primitive types.
→ Not quite. The test works with any two types.
```
