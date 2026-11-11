# Arrow functions

An arrow function is a shorter way to write a function. It uses `=>` to separate the inputs from the body, and it's most useful when the function is small and used once, such as the rule you pass to `filter` or `map`. You met arrow functions in the arrays chapter. This step explains them properly.

> **Coming from JavaScript:** arrow functions are the same in both languages. The labels on the inputs and the result are the TypeScript part.

## The program

The program is already in `main.ts`:

```ts
const square = (n: number): number => n * n;

const add = (a: number, b: number): number => {
  return a + b;
};

console.log(square(5));
console.log(add(2, 3));
```

Press **Run**. You should see:

```
25
5
```

There are two forms, and they differ in how the body is written:

- **`square`** has an expression body. The value after `=>` is the result, so `n * n` is returned without a `return` word. This is the shortest form, and it suits a one-line rule.
- **`add`** has a block body, in braces. A block body needs `return` to give back a result, just like a function declaration. Use a block body when the function needs more than one line.

The arrow form doesn't change what the function does. It's the same kind of value as a function declared with `function`, and it's called in the same way.

## Where arrow functions help

The shorter form is most useful when a function is passed to another function. The array methods from the last chapter are the usual case:

```ts
prices.filter((p: number) => p < 10)
```

The rule is written next to the method that uses it, so the reader doesn't have to look elsewhere to see what the filter does. Name a function when it's used in several places, or when it's long enough that a name explains its purpose better than the code does.

## Try it

- Write `const cube = (n: number): number => n * n * n;`, and print `cube(3)`.
- Change `add` to an expression body, and check that the output doesn't change.
- Write an arrow function `isEven` that takes a number and returns `n % 2 === 0`. Print `isEven(4)` and `isEven(7)`.

## Quiz

```quiz
What is the difference between `(n: number): number => n * n` and `(n: number): number => { n * n }`?
○ The first is faster.
→ Not quite. The two forms run at the same speed.
◉ The second block body has no `return`, so it gives back nothing.
→ Right. In a block body, the value is given back only by `return`, so this version returns `undefined`.
○ The second is required for numbers.
→ Not quite. Numbers can use either form.
```

```quiz
Why is an arrow function often used in `prices.filter((p: number) => p < 10)`?
○ Because `filter` cannot accept a named function.
→ Not quite. `filter` accepts either form.
◉ Because the rule is short and sits next to the method that uses it.
→ Right. An inline arrow keeps a small rule where it's used.
○ Because arrow functions run without calling `filter`.
→ Not quite. The function still runs once for each item.
```
