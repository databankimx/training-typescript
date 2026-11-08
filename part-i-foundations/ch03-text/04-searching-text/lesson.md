# Searching text

Sometimes you only need to know whether a word is in the text, and sometimes you need to know exactly where it is. Both questions come up constantly, and both have answers that are easy to get slightly wrong by hand.

> **Coming from JavaScript:** `includes`, `startsWith`, and `indexOf` work the same way in both languages.

## Asking yes or no

Some questions about text have a yes or no answer. Does this sentence contain a word? Does it start with a particular word? Methods that answer those questions give back `true` or `false`, which are called **booleans**. Chapter 5 looks at booleans in more detail.

```ts
console.log(sentence.includes("quick"));
console.log(sentence.startsWith("The"));
```

- **`includes("quick")`** is `true` if the word appears anywhere in the text.
- **`startsWith("The")`** is `true` only when the text begins with those letters.

## Asking where

Sometimes you need the position of a word, not just whether it's there. Positions start at `0`, so the first character is at position `0`, the second at `1`, and so on.

```ts
console.log(sentence.indexOf("brown"));
```

`indexOf` gives the position where `"brown"` first starts, which is `10`. If the word isn't in the text, `indexOf` gives `-1`. That's a useful value to check for, because it means "not found".

## Press Run

The program is already in `main.ts`. You should see:

```
true
true
10
```

## Try it

- Change `"quick"` to `"slow"` in the `includes` line. What's printed?
- Count the characters in `"The quick brown fox"` by hand, and check that the position of `brown` is `10`.
- Use `indexOf("cat")`, a word that isn't in the sentence. What value do you get back?

## Quiz

```quiz
What is the position of the first character of `"brown"` in `"The quick brown fox"`?
○ 9
→ Not quite. Count the spaces and letters before `b`, starting from `0`.
◉ 10
→ Right. Positions start at 0, so the `b` is the eleventh character, at position 10.
○ 11
→ Not quite. Positions start at 0, not 1.
```

```quiz
What does `includes` give back?
○ The text that was searched for.
→ Not quite. It gives back a yes or no answer.
◉ `true` or `false`.
→ Right. `includes` answers whether the text contains the word.
○ A number of letters.
→ Not quite. That's `length`, which counts characters.
```
