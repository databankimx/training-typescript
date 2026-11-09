## Summary: Regular expressions

A pattern describes the shape of text, and the typed methods report what it found.

* **`test` answers yes or no, and `exec` returns the match or `null`.** Check for `null` before reading a match.
* **Anchors turn a search into a validation.** Without `^` and `$`, a pattern accepts a value that merely contains a valid one.
* **Parentheses capture the parts of a match.** Captures are strings, and typed destructuring reads them by position.
* **`g` finds every match.** `match` returns the matched text, and `matchAll` returns the captures too.
* **`replace` returns a new string.** A function replacement computes each replacement from the match it receives.

### Check your understanding

*These questions are written for this course.*

```quiz
A validator for postal codes accepts `XX12345`, although the rule allows only `XX1234`. What is the most likely cause?
○ The character class is too narrow.
→ Not quite. A narrow class would reject valid values, not accept extra ones.
◉ The pattern is not anchored, so a valid part of a longer value is accepted.
→ Right. Anchors make the whole value the shape, so a longer value fails.
○ The `g` flag is missing.
→ Not quite. The `g` flag affects matching every occurrence, not validation.
```

```quiz
What does `text.match(/(\d+)-(\d+)/)` give when there is a match?
○ Only the first capture.
→ Not quite. It returns the whole match and every capture.
◉ An array whose first item is the whole match and whose next items are the captures.
→ Right. Index zero is the whole match, and the rest are captures in order.
○ The number of digits in the text.
→ Not quite. It returns the matched text and its captures.
```

```quiz
Why is a function used as the replacement for `replace`?
○ Because fixed replacements are not allowed.
→ Not quite. Fixed replacements are allowed, and they are often enough.
◉ Because the function receives each match and can return different text depending on it.
→ Right. A function computes the replacement, where a fixed string cannot.
○ Because the function makes the replacement faster.
→ Not quite. Speed is not the reason.
```
