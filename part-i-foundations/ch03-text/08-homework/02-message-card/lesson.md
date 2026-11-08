# Homework: message card

**Before you start:** try the string report exercise first. This one uses the same methods.

> **Coming from JavaScript:** template strings and string methods work the same way in both languages.

## The task

A name arrived from a form as `"  ada  "`, with spaces at both ends.

Change `main.ts` so that it prints this exact sentence:

```
Dear Ada, your report is ready.
```

The name must come from the cleaned, capitalised value, not from typing `Ada` into the sentence.

## Hints

- Clean the name first, then capitalise it, in the same way as the string report exercise.
- A template string can hold the name, so the sentence reads clearly.

## When you're stuck

Show the example. It's a spoiler, so give it a proper attempt first.

## Quiz

```quiz
Why use a template string for the sentence, rather than joining pieces with `+`?
○ Because `+` doesn't work with text.
→ Not quite. `+` works with text. A template string is just easier to read when the sentence has a value in the middle.
◉ Because the sentence reads as it will be printed, with the name in place.
→ Right. The template string shows the finished sentence, with the value in the right spot.
○ Because template strings are faster.
→ Not quite. Speed isn't the reason here. Clarity is.
```
