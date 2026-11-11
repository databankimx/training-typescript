# Homework: byte length

A message field accepts at most a fixed number of bytes, because the message is stored as UTF-8. A field that counts characters would let a long accented word through and then overflow the storage. The exercise writes `byteLength`, which measures the encoded size, and uses it to compare the two counts.

> **Coming from JavaScript:** `TextEncoder` and `length` are the same in both languages. The `text: string` and `: number` labels are the TypeScript part.

## The task

Start from the starter `main.ts`, which prints character counts. Then, in your own file:

1. Write `byteLength(text: string): number`, which returns the length of the UTF-8 encoding.
2. Print `byteLength("naïve")` and `byteLength("abc")`.

The output should be:

```text
6
3
```

## Hints

- `new TextEncoder().encode(text)` returns the bytes, and each byte is one element of the result.
- `"naïve"` has five characters, but the `ï` takes two bytes, so the count is six.

## Try it yourself

- Print `"naïve".length` and `byteLength("naïve")` side by side. Why do they differ?
- Measure the emoji `"😀"`. How many bytes does it take?

## Quiz

```quiz
Why is `byteLength("naïve")` 6 when the word has five characters?
○ Because the encoder adds a byte at the end.
→ Not quite. The encoder adds nothing.
◉ Because the letter `ï` takes two bytes in UTF-8, and the others take one each.
→ Right. The extra byte comes from the accented character.
○ Because `length` counts the spaces.
→ Not quite. The word has no spaces.
```
