# Patterns and matching

A regular expression is written between two slashes, and it is a `RegExp` value like any other. The simplest pattern is a literal: `/cat/` matches the letters c, a, and t in that order, anywhere in the text. It does not need to match the whole text, which surprises people the first time they use it.

> **Coming from JavaScript:** regular expressions are the same in both languages. The `const pattern: RegExp` label is the TypeScript part, and it names the type the `test` method is defined on.

## The program

```typescript
const pattern: RegExp = /cat/;

console.log(pattern.test("concatenate"));
console.log(pattern.test("dog"));
```

```text
true
false
```

`test` returns `true` when the pattern matches anywhere in the text. `concatenate` contains `cat` in its middle, so the first call is `true`. `dog` contains no `cat`, so the second is `false`.

## Anchors

To require a match across the whole text, anchor the pattern with `^` at the start and `$` at the end. `/^cat$/` accepts `cat` and rejects `concatenate`. Anchoring is the first thing to check when a validation accepts too much.

## Try it yourself

- Test `/^cat$/` against `cat`, `concatenate`, and `Cat`. Which return `true`?
- Add the `i` flag, as in `/cat/i`, and test `Cat`. What changes?

## Quiz

```quiz
What does `pattern.test("concatenate")` return for `/cat/`?
○ `false`, because the pattern must match the whole text.
→ Not quite. A match anywhere in the text is enough for `test`.
◉ `true`, because `cat` appears inside the text.
→ Right. An unanchored pattern finds a match anywhere.
○ `"cat"`, the matched text.
→ Not quite. `test` returns a boolean. `match` and `exec` return the matched text.
```
