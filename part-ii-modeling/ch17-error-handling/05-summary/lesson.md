## Summary: Error handling

Failures come in two kinds, and each has its own tool. Unexpected failures are thrown and caught. Expected ones are returned as results.

* **`try` and `catch` contain a thrown error.** The caught value is `unknown`, so check it with `instanceof Error` before reading it.
* **`throw` stops a function and sends the error up.** Give the error a message that names the value and the rule.
* **`finally` runs in every case.** Put cleanup there, not after the `try` statement.
* **A result type returns success or failure as a value.** A shared `ok` property with literal types lets the checker narrow to each shape.

### Check your understanding

*These questions are written for this course.*

```quiz
A caught value is typed `unknown`. What must you do before reading `error.message`?
○ Nothing. Every caught value has a message.
→ Not quite. A thrown value might not be an `Error`, so the checker requires a check first.
◉ Check with `instanceof Error`, which narrows the value to an error.
→ Right. The check proves the value has a message before it's read.
○ Convert the error to text with `String(error)`.
→ Not quite. That works, but the checker only allows the `message` after the `instanceof` check.
```

```quiz
Where should cleanup code go, if it must run even when the function returns early?
○ After the `try` statement.
→ Not quite. Code after the `try` statement is skipped when the block returns or throws.
◉ In a `finally` block.
→ Right. `finally` runs whether the `try` returns, throws, or completes normally.
○ Before the `try` statement.
→ Not quite. Code placed before the `try` runs before the work, not after it.
```

```quiz
What does `if (result.ok)` narrow `result` to?
○ The failure shape, which has an `error`.
→ Not quite. The `ok` check is true for the success shape.
◉ The success shape, which has a `value`.
→ Right. The literal `true` on `ok` identifies the success shape.
○ Nothing, because `ok` is only a property.
→ Not quite. The literal type of `ok` is what lets the checker narrow.
```
