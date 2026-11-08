## Summary: Types as promises

These are the basic ideas from this chapter.

* **A type says what kind of value something is.** Numbers and text are the two you've met most.
* **An annotation writes the type down.** On a function, it says what the function receives and what it gives back.
* **Inference works out the type from the value.** A box made with `const count = 3;` holds a number, and the checker knows it without a label.
* **The checker keeps the promises.** Node runs a program whether its promises hold or not, so a broken promise can still print an answer.

### Check your understanding

*These questions are written for this course.*

```quiz
In `function total(prices: number[]): number`, what does the `: number` after the brackets promise?
○ Each price is a number.
→ That's the promise on `prices`. The label after the brackets is about the result.
◉ The function gives back a number.
→ Right. A return annotation promises the kind of value the caller receives.
○ The total will be printed.
→ Not quite. Annotations describe values. They don't decide what gets printed.
```

```quiz
Why does Node run `greet(42)` without complaint, when the checker reports the broken promise?
○ Node checks the types, and allows the number because it can be printed.
→ Not quite. Node doesn't check types at all.
◉ Node doesn't enforce annotations, so only the checker reports the mismatch.
→ Right. The checker compares what you pass with the annotations. Node runs whatever it's given.
○ The checker is wrong, and Node is right.
→ Not quite. The checker is correct to report it. Node simply doesn't check the promise.
```

```quiz
In `const count = 3;`, which kind of value does TypeScript work out for `count`?
○ any
→ Not quite. `any` means no kind of value is known, and here the value tells us what it is.
◉ number
→ Right. TypeScript works the type out from the value `3`.
○ unknown
→ Not quite. `unknown` means a value whose kind isn't known yet, and this one is known.
```
