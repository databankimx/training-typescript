# Homework: recursive palindrome checker

A word is a palindrome when it reads the same forwards and backwards: `racecar` does, `recursion` does not. A palindrome checker is a natural recursive problem, because a word is a palindrome exactly when its first and last letters match and the middle is a palindrome too.

> **Coming from JavaScript:** the string indexing and `slice` are the same in both languages. The `text: string` and `: boolean` labels are the TypeScript part.

## The task

Start from the starter `main.ts`, which prints `racecar`. Write a recursive function `isPalindrome(text: string): boolean` that:

1. Returns `true` when the text has zero or one letter. This is the base case.
2. Returns `false` when the first and last letters differ.
3. Otherwise returns the answer for the text with its first and last letters removed.

Print `isPalindrome("racecar")` and `isPalindrome("recursion")`. The output should be:

```text
true
false
```

## Hints

- `text[0]` is the first letter, and `text[text.length - 1]` is the last.
- `text.slice(1, -1)` returns the text without its first and last letters.
- Progress is the shrinking text. Each call has fewer letters than the last.

## Try it yourself

- Check an even-length palindrome, such as `abba`. Does the base case still apply?
- Check an empty string. Why does it return `true`?

## Quiz

```quiz
Why does the function check `text.length <= 1` before comparing the first and last letters?
○ Because a one-letter word has no first letter.
→ Not quite. A one-letter word does have a first letter, which is also its last.
◉ Because words of length zero or one are palindromes already, so there is nothing to compare.
→ Right. The base case answers directly, and the comparison is only needed for longer words.
○ Because `slice` cannot be used on short strings.
→ Not quite. `slice` works on any length of string.
```
