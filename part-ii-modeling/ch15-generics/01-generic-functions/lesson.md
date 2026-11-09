# Generic functions

A **type parameter** is a name in angle brackets, such as `<T>`, that stands for a type the caller chooses. `firstOf<T>` means: for any type `T`, take a list of `T` and give back a `T`. The caller decides what `T` is, usually from the values passed in, and the checker tracks it through the call.

> **Coming from JavaScript:** generics are a TypeScript-only feature. Node ignores the `<T>` and the labels, and runs the same code for every type.

## The program

The program is already in `main.ts`:

```ts
function firstOf<T>(items: T[]): T | undefined {
  return items[0];
}

console.log(firstOf([10, 20]));
console.log(firstOf(["a", "b"]));
```

Press **Run**. You should see:

```
10
a
```

The first call passes a list of numbers, so `T` is `number`, and the result is a number or `undefined`. The second passes text, so `T` is `string`. One function definition serves both, and the checker gives each call the right type.

The return type `T | undefined` is honest about the empty list: when there's no first item, `items[0]` is `undefined`. The union from Chapter 12 describes that.

## Why not write it twice

Without generics, you would need `firstOfNumber` and `firstOfText`, each with the same body. Those functions would repeat the logic, and a change to one would need a change to the other. A generic function keeps the logic in one place, while the checker still refuses mixed lists of different types.

## Try it

- Add `console.log(firstOf([]));`. What is printed, and what type does the checker give the call?
- Write `const first = firstOf([1, "two"]);`, and hover over `first` in VS Code. What type does TypeScript give it?
- Write `function lastOf<T>(items: T[]): T | undefined`, with a body that returns the last item.

## Quiz

```quiz
What does `<T>` in `function firstOf<T>(items: T[])` mean?
○ `T` is a fixed type, always a number.
→ Not quite. `T` stands for a type the caller chooses for each call.
◉ `T` is a type parameter, chosen by the caller, and used for the items and the result.
→ Right. The type parameter lets one function work for many types while the checker tracks each one.
○ `T` is a value that the function returns.
→ Not quite. `T` is a type, not a value.
```

```quiz
Why is the return type `T | undefined` rather than just `T`?
○ Because `undefined` is always allowed in a return type.
→ Not quite. A return type must still describe the values the function can give back.
◉ Because an empty list has no first item, so the function can give back `undefined`.
→ Right. The union describes the missing case honestly.
○ Because `T` could be text.
→ Not quite. Text is one of the possible types of `T`, and it's not the reason for the union.
```
