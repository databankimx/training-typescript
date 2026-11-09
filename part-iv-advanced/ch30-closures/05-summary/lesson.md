## Summary: Closures

A closure is a function together with the variables it was written with.

* **A returned function keeps the variables it was created with.** The variables live as long as the function does.
* **Each call to a factory creates separate state.** Two counters never share a count.
* **Variables inside a closure are private.** Only the functions that close over them can reach them.
* **Memoization uses a closure to remember results.** Check for a missing entry with `!== undefined`, so zero counts as a hit.

### Check your understanding

*These questions are written for this course.*

```quiz
What does a closure remember?
○ Every value the program has ever computed.
→ Not quite. A closure keeps only the variables in scope where it was written.
◉ The variables from the scope where the function was written.
→ Right. Those variables stay alive for as long as the function exists.
○ Only the last value it returned.
→ Not quite. A closure keeps its variables, not its previous results, unless it is memoized.
```

```quiz
Why does a memoized function have to check `!== undefined` rather than `if (remembered)`?
○ Because `if` cannot be used with maps.
→ Not quite. `if` works with maps. The issue is which values count as a hit.
◉ Because zero and empty text are falsy, so a plain test would miss a valid cached result.
→ Right. The explicit comparison treats every stored result as a hit.
○ Because `undefined` makes the function run faster.
→ Not quite. The reason is correctness.
```

```quiz
Two counters are made by calling `makeCounter` twice. What happens when one is called?
○ The other counter goes up too.
→ Not quite. They share nothing.
◉ Only that counter's own count changes.
→ Right. Each call to the factory creates a separate set of variables.
○ Both counters are reset.
→ Not quite. Calling one does not reset anything.
```
