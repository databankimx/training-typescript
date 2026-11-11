## Summary: Booleans and missing values

Most of what a program does depends on a yes or no, so it's worth being precise about where those answers come from. Here's the short version.

* **A boolean is a yes or no.** It holds `true` or `false`, and `!` turns it around.
* **Comparisons give booleans.** Use `===` and `!==`, which compare without converting, so `72` and `"72"` stay different.
* **Some values count as no when checked directly.** `0`, `""`, `NaN`, `null`, `undefined`, and `false` are falsy. Everything else is truthy.
* **`&&` and `||` combine answers, and stop early.** `||` returns the first truthy value, which makes it a fallback, but `??` is the safer fallback when an empty value is a real answer.
* **Missing values need a label.** `string | undefined` tells the checker the value might be missing, and `?.` and `??` deal with it.

### Check your understanding

*These questions are written for this course.*

```quiz
Which expression gives `false` when `age` is `17` and `hasTicket` is `true`?
○ `age >= 18 || hasTicket`
→ Not quite. `||` is true when either side is true, and `hasTicket` is true.
◉ `age >= 18 && hasTicket`
→ Right. `&&` needs both sides to be true, and `age >= 18` is false.
○ `!hasTicket`
→ Not quite. That's false, but it's not about the age.
```

```quiz
What does `if (count) { ... } else { ... }` do when `count` is `0`?
○ It runs the block after `if`.
→ Not quite. The number zero is falsy, so the program takes the else branch.
◉ It runs the block after `else`.
→ Right. Zero counts as no, so the else block runs.
○ It stops with an error.
→ Not quite. A falsy condition is an ordinary answer.
```

```quiz
Which label means a value might be missing?
○ `: string`
→ Not quite. That label says the value is text, and nothing else.
◉ `: string | undefined`
→ Right. The vertical bar means the value is text or missing.
○ `: missing`
→ Not quite. There's no such type. The checker only knows `null` and `undefined`.
```
