## Summary: Functional tools

Functional tools describe what happens to data, and they combine small functions into larger ones.

* **`map`, `filter`, and `reduce` change, keep, and combine.** Each returns a new value, and none changes the original array.
* **Composition joins functions in order.** The result of one is the input of the next, and the checker verifies the join.
* **Partial application fixes some arguments.** The returned function remembers them, and can be passed to `map` or `filter` directly.

### Check your understanding

*These questions are written for this course.*

```quiz
Why does `reduce` take a starting value, such as 0 for a sum?
○ Because `reduce` cannot run on an empty array.
→ Not quite. The starting value is about the first step, not the array's length.
◉ Because the accumulator begins with it, and each item is combined into it in turn.
→ Right. The starting value is the first accumulator, before any item is added.
○ Because it makes the result a string.
→ Not quite. The type of the starting value sets the type of the result.
```

```quiz
What does `compose(f, g)(x)` compute?
○ `f(x)` followed by `g`.
→ Not quite. The order is `g` first, then `f`.
◉ `f(g(x))`, so `g` runs first and its result is passed to `f`.
→ Right. Composition applies the right-hand function first.
○ `f(x) + g(x)`.
→ Not quite. Composition chains the functions, rather than adding their results.
```

```quiz
Why is `multiply(3)` easier to pass to `map` than `(a, b) => a * b`?
○ Because `map` cannot pass two arguments.
→ Not quite. `map` passes one value to its callback.
◉ Because the fixed factor is already in the returned function, so it takes only the value `map` supplies.
→ Right. The partly applied function matches what `map` provides.
○ Because `multiply(3)` runs faster.
→ Not quite. The reason is the shape of the function.
```
