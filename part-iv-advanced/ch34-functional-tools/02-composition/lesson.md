# Composing functions

Composition joins two functions into one. `compose(f, g)` returns a function that applies `g` first and passes its result to `f`. The order matters: `compose(double, addOne)` and `compose(addOne, double)` give different answers for the same input.

> **Coming from JavaScript:** composition is the same in both languages. The generic parameters `A`, `B`, and `C` are the TypeScript part. They make the checker verify that `g`'s output type is the same as `f`'s input type.

## The program

```typescript
function compose<A, B, C>(f: (b: B) => C, g: (a: A) => B): (a: A) => C {
  return (a: A): C => f(g(a));
}

const doubleAfterAdding = compose(double, addOne);
console.log(doubleAfterAdding(4));

const addingAfterDoubling = compose(addOne, double);
console.log(addingAfterDoubling(4));
```

```text
10
9
```

With `compose(double, addOne)`, the input 4 goes first through `addOne`, giving 5, and then through `double`, giving 10. The second composition reverses the order, so 4 goes through `double` first and then `addOne`, giving 9.

## Why the types matter

The type parameter `B` appears in both `f`'s input and `g`'s output. If the two functions did not fit together, for example if `g` returned text and `f` expected a number, the call to `compose` would be refused. The checker catches the mismatch when the functions are joined, not when the combined function runs.

## Try it yourself

- Write `compose(double, double)`, and call it with 3. What is the answer, and why?
- Write a `square` function, and compose it with `addOne` in both orders. Which order gives the bigger result for 3?

## Quiz

```quiz
What does `compose(addOne, double)(4)` return?
○ 10
→ Not quite. That is the result of `compose(double, addOne)`, which runs the other function first.
◉ 9
→ Right. `double` runs first, giving 8, and then `addOne` gives 9.
○ 5
→ Not quite. 5 is what `addOne` gives on its own, with no doubling.
```
