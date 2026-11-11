# Conditional types

A conditional type has the form `T extends U ? X : Y`. The checker asks whether `T` can be assigned to `U`, and it gives `X` if so, and `Y` if not. `infer` names a part of the type while the test runs, so the result can use it. `Unwrap` uses `infer Inner` to take the type out of a promise.

> **Coming from JavaScript:** there is no JavaScript version, because types are checked only at compile time. Node runs the program with the types removed, so the output depends only on the values.

## The program

```typescript
type Unwrap<T> = T extends Promise<infer Inner> ? Inner : T;

const fromPromise: Unwrap<Promise<number>> = 5;
const plain: Unwrap<string> = "text";

console.log(fromPromise);
console.log(plain);
```

```text
5
text
```

`Unwrap<Promise<number>>` is `number`, so `5` is accepted. `Unwrap<string>` is `string`, because a string is not a promise, so `"text"` is accepted. If you wrote `const wrong: Unwrap<Promise<number>> = "five";`, the checker would refuse it, because the type has become `number`.

## Why conditional types matter

They let one type adapt to its input. The utility types from the generics chapter, such as `NonNullable`, are built this way. Writing your own condition is how a library expresses rules like "if a function returns a promise, callers receive the resolved value".

## Try it yourself

- Write `const wrong: Unwrap<Promise<number>> = "five";`, and press Check. What does the checker report?
- Write `type IsText<T> = T extends string ? "yes" : "no";`, and give a value of type `IsText<number>` the value `"no"`.

## Quiz

```quiz
What is `Unwrap<Promise<boolean>>`?
○ `Promise<boolean>`, because the type is unchanged.
→ Not quite. The conditional strips the promise, so the type changes.
◉ `boolean`, because the condition matches and `infer` extracts the resolved type.
→ Right. The promise's inner type is named by `infer` and returned.
○ `unknown`, because the condition cannot be decided.
→ Not quite. The condition is decided from the type it is given.
```
