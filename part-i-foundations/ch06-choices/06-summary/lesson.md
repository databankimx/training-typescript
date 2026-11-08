## Summary: Choices

Choosing is most of what a program does, and the tools are simple. Each one suits a different shape of decision, so it's worth knowing which to reach for.

* **`if` and `else` choose between two blocks.** The condition is a boolean, and exactly one block runs.
* **`else if` checks ranges in order.** The first yes wins, so put the highest or most specific range first.
* **The conditional operator chooses a value.** Use it when the choice is small and the result is one value.
* **`switch` chooses between named cases.** Put a `break` at the end of each case unless you mean to fall through.
* **Nesting shows dependency.** A flat list of conditions is often easier to read.

### Check your understanding

*These questions are written for this course.*

```quiz
Which tool suits a choice between the names `"Mon"`, `"Tue"`, and `"Wed"`?
○ A conditional operator with three branches.
→ Not quite. The conditional operator has two answers, so three names need more than one.
◉ A `switch` with a case for each name.
→ Right. `switch` is built for choosing between named values.
○ A `while` loop.
→ Not quite. A loop repeats code, and this choice only needs to pick one branch.
```

```quiz
What goes wrong if you leave out the `break` at the end of a case that should stop?
○ The program stops with an error.
→ Not quite. The program keeps running, and the error is not the usual result.
◉ The following cases run as well, and the output is wrong.
→ Right. Without `break`, the program falls through into the next case.
○ The checker refuses to run the program.
→ Not quite. The checker doesn't stop a missing `break`, so the mistake is only visible in the output.
```

```quiz
In `age >= 18 ? "adult" : "child"`, what does the `:` do?
○ It starts a new condition.
→ Not quite. The condition has already been given before the `?`.
◉ It separates the answer for yes from the answer for no.
→ Right. The part before the `:` is used when the condition is yes, and the part after it when the condition is no.
○ It joins two values into text.
→ Not quite. The colon is part of the choice, not a join.
```
