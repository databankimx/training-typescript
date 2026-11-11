# Partial application

Partial application fixes some of a function's arguments in advance, and returns a new function that needs the rest. `multiply(3)` is a function that multiplies by three, which is easier to pass to `map` than a two-argument function that would need a wrapper. The fixed value is kept inside the returned function, as closures do.

> **Coming from JavaScript:** the technique is the same in both languages. The return type `(value: number) => number` is the TypeScript part, and it says the partly applied function takes one number.

## The program

```typescript
function multiply(factor: number): (value: number) => number {
  return (value: number): number => factor * value;
}

const triple = multiply(3);
console.log(triple(7));
console.log([1, 2, 3].map(triple).join(", "));
```

```text
21
3, 6, 9
```

`multiply(3)` runs once and returns a function that remembers 3. `triple(7)` gives 21. `map` calls `triple` with each value in turn, giving 3, 6, and 9.

## Why not a wrapper

Without partial application, the same job needs an arrow function at the call site, such as `map(value => multiply(3, value))`. Naming the partly applied function gives the operation a name, and the name appears wherever the operation is used.

## Try it yourself

- Make `add(10)` with a function `add(a: number): (b: number) => number`, and map it over `[1, 2, 3]`.
- Call `multiply(3)` twice with different factors. Are the two functions independent?

## Quiz

```quiz
What does `triple` remember after `multiply(3)` returns?
○ Nothing, because the function has finished.
→ Not quite. The returned function keeps the factor, as a closure does.
◉ The factor 3, which the returned function uses on every call.
→ Right. The fixed argument lives on inside the new function.
○ The value 7, the last argument it was called with.
→ Not quite. Nothing is remembered from calls. The factor is fixed when `multiply(3)` runs.
```
