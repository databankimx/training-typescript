# Homework: message card

The same kind of problem, with a name instead of a title. Use what you just did, and check that the sentence comes out exactly right, which matters more than you might think.

> **Coming from JavaScript:** template strings and string methods work the same way in both languages.

## The task

A name arrived from a form as `"  ada  "`, with spaces at both ends.

Here is the starting code:

```ts
const recipient: string = "  ada  ";

console.log(recipient);
```

Start from the code above, in your own file, and change it so that it prints this exact sentence:

```
Dear Ada, your report is ready.
```

The name must come from the cleaned, capitalized value, not from typing `Ada` into the sentence.

## Hints

- Clean the name first, then capitalize it, in the same way as the string report exercise.
- A template string can hold the name, so the sentence reads clearly.

## When you're stuck

Show the solution. It's a spoiler, so give it a proper attempt in your own file first.

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
