## Summary: Loops

A loop saves you from writing the same code over and over. Choosing the right form keeps it readable.

* **`while` repeats while a condition holds.** Make sure something in the loop changes the condition, or the loop never ends.
* **`for` keeps the counter in the header.** The start, the condition, and the change sit together.
* **`for...of` visits each item in a list, and `for...in` visits each key in an object.** Neither needs a counter.
* **`break` leaves the loop, and `continue` skips to the next item.** Keep both near the top of the loop body.
* **An inner loop runs in full for each pass of the outer one.** Declare variables where they should start fresh.

### Check your understanding

*These questions are written for this course.*

```quiz
Which loop form is the best choice for printing every item in a list of names?
○ `while`, with a counter.
→ Not quite. That works, but a counter adds work you don't need here.
◉ `for...of`, because it gives each item in turn.
→ Right. `for...of` gives you each item without any counting.
○ `break`, because it prints items.
→ Not quite. `break` leaves a loop. It doesn't print anything.
```

```quiz
What is the result of `continue` inside a loop?
○ The loop stops.
→ Not quite. That's `break`.
◉ The rest of this pass is skipped, and the loop moves to the next item.
→ Right. `continue` ends the current pass early, and the loop carries on.
○ The loop starts again from the first item.
→ Not quite. The loop moves on, and doesn't restart.
```

```quiz
A `while` loop's body never changes the variable in its condition. What happens?
○ The checker stops it before it runs.
→ Not quite. The checker doesn't run loops, so it can't stop one.
◉ The loop keeps running until the program is stopped or times out.
→ Right. A condition that never becomes false produces an infinite loop.
○ The loop runs once, then ends.
→ Not quite. A `while` loop checks its condition again before every pass.
```
