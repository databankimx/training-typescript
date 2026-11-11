## Summary: Iterators and generators

Iteration is a protocol, and a generator is the easiest way to write something that follows it.

* **An iterable provides an iterator under `Symbol.iterator`.** Each `next` call returns a value and a `done` flag.
* **A generator pauses at each `yield`.** Its body runs only as far as the next value the consumer asks for.
* **A generator's variables survive the pauses.** Each resume continues where the last one stopped.
* **A consumer controls how much of a sequence is read.** An infinite generator is safe when the loop breaks.

### Check your understanding

*These questions are written for this course.*

```quiz
What must an object provide to be used in `for...of`?
○ A method called `iterate`.
→ Not quite. The loop looks for the method under `Symbol.iterator`.
◉ A method under `Symbol.iterator` that returns an iterator with a `next` method.
→ Right. That is the iteration protocol, and the loop follows it.
○ An array of its values.
→ Not quite. The values can be produced one at a time without an array.
```

```quiz
What does `yield` do in a generator?
○ It ends the generator for good.
→ Not quite. A generator can resume after a yield.
◉ It hands out a value and pauses until the next value is requested.
→ Right. Execution resumes at the line after the yield on the next request.
○ It prints the value to the console.
→ Not quite. Printing is a separate action.
```

```quiz
Why is an infinite generator safe to pass to `take`?
○ Because the checker stops infinite loops.
→ Not quite. The checker does not run programs.
◉ Because `take` stops reading once it has enough values, and the rest is never computed.
→ Right. The consumer decides how far the sequence is read.
○ Because infinite generators return an empty result.
→ Not quite. They return values until the consumer stops.
```
