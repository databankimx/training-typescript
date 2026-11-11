# Generic library functions

A generic function is easiest to use when the caller does not have to repeat the type. `createList` takes a callback, and `T` is inferred from what the callback returns. A caller writes `createList(3, (index) => index * 2)` and gets a `number[]`, with no type argument in sight.

> **Coming from JavaScript:** the function is the same in both languages. The `<T>` type parameter and the `T[]` result are the TypeScript part.

## The program

```typescript
function createList<T>(count: number, make: (index: number) => T): T[] {
  const items: T[] = [];
  for (let index: number = 0; index < count; index++) {
    items.push(make(index));
  }
  return items;
}

console.log(createList(3, (index: number): number => index * 2).join(", "));
console.log(createList(2, (index: number): string => `item ${index}`).join(", "));
```

```text
0, 2, 4
item 0, item 1
```

The checker reads the callback's return type first, and sets `T` from it. The first call returns `number[]`, the second returns `string[]`, and each result keeps its type for the rest of the program.

## Design for inference

Put the type where it can be inferred from a value the caller already provides. Here the callback's return type drives `T`, so the caller never names it. If the only place `T` appeared were the return type, the caller would have to write it out, and the function would be harder to use.

## Try it yourself

- Change the second call so its callback returns `index > 0`. What is the type of the result?
- Write `createList<string>(2, (index: number): number => index);`, and press Check. What does the checker report?

## Quiz

```quiz
Why does `createList(3, (index) => index * 2)` need no type argument?
○ Because the function is not generic.
→ Not quite. It is generic, and the type is inferred from the callback.
◉ Because the checker infers `T` from what the callback returns, which is a number.
→ Right. Inference lets callers skip the type argument when the value provides it.
○ Because `index` is always a number, so `T` defaults to it.
→ Not quite. The type comes from the callback's return type, not from `index`.
```
