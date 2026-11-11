## Summary: Async

Asynchronous code lets a program keep working while it waits for a result. The tools below describe the waiting, and the checker tracks the value each promise will give.

* **A promise stands for a value that arrives later.** It is pending, then fulfilled with a value, or rejected with an error.
* **`async` functions return promises, and `await` pauses only its own function.** The rest of the program carries on.
* **A rejected promise throws at the `await`.** Put a `try` and `catch` around the awaits that can fail.
* **`Promise.all` runs operations together.** It waits for all of them, and gives back their results in order.

### Check your understanding

*These questions are written for this course.*

```quiz
What does `await` do to the program as a whole?
○ It stops the whole program until the promise settles.
→ Not quite. `await` pauses only the function it is in.
◉ It pauses the function it is in, and the rest of the program carries on.
→ Right. Other work continues while the awaited function waits.
○ It cancels the promise.
→ Not quite. `await` waits for the result. It doesn't cancel anything.
```

```quiz
A function returns `Promise<number>`, and it is awaited inside a `try` block. What happens if the promise is rejected?
○ The `catch` block receives the number `0`.
→ Not quite. A rejected promise throws an error, not a value.
◉ The `await` throws the error, and the `catch` block handles it.
→ Right. A rejection becomes an ordinary thrown error at the `await`.
○ The error is lost, and the program continues silently.
→ Not quite. The error is thrown, and the `catch` block can handle it.
```

```quiz
Why use `Promise.all` for three independent requests?
○ Because the requests must run one after another.
→ Not quite. `Promise.all` is for requests that can run at the same time.
◉ Because the requests start together, so the wait is about the slowest one.
→ Right. The requests overlap, so the total wait is not the sum of all of them.
○ Because `Promise.all` makes the requests faster to send.
→ Not quite. Sending is not the point. The waits overlap.
```
