## Summary: Recursion

A recursive function calls itself on a smaller version of its problem, and it stops at a base case.

* **Every recursion needs a base case and progress.** The base case answers directly, and progress carries each call toward it.
* **Results combine as the calls return.** The work is done on the way back up as well as on the way down.
* **Recursive types describe nested data.** A type can refer to itself inside an array, and narrowing each item tells the checker which case it is in.
* **A loop has no depth limit, and a recursion does.** Choose by the shape of the problem, not by habit.
* **Naive recursion can repeat work.** A branching definition may recompute the same values many times.

### Check your understanding

*These questions are written for this course.*

```quiz
A recursive function has no base case. What is the most likely result?
○ It returns zero.
→ Not quite. Without a base case, nothing returns the answer.
◉ The calls never stop, and the runtime reports that the call stack is exhausted.
→ Right. The waiting calls grow until the runtime's limit is reached.
○ It prints each number once.
→ Not quite. Without a stopping point it does not stop, so it does not finish the printing.
```

```quiz
Why does `sumNested` check `typeof item === "number"` before the recursive call?
○ Because the checker refuses any call in a loop.
→ Not quite. Calls in loops are allowed.
◉ Because a number cannot be passed to the function, and the check narrows the item.
→ Right. The narrowing is what makes the recursive call type-correct.
○ Because numbers are slower to add.
→ Not quite. Speed is not the reason.
```

```quiz
Why is the naive `fib(30)` slow, even though it is correct?
○ Because `fib` is a recursive function, and recursive functions are slow.
→ Not quite. Recursion itself is not slow. The repeated calls are the cost.
◉ Because each call branches into two, and the same values are recomputed many times.
→ Right. The number of calls grows much faster than the input.
○ Because the checker cannot read the function.
→ Not quite. The checker reads it, and the slowness is at run time.
```
