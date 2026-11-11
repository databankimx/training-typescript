# Homework: full name

A sign-up form collects a first name and a last name, typed in lower case. The welcome message needs them shown properly, with a capital letter at the start of each. The same tidying is needed for both names, so it's worth writing once, as a function, and calling it twice.

> **Coming from JavaScript:** string methods and template strings work the same way in both languages. The `string` labels are the TypeScript part.

## The task

Here is the starting code, which prints the first name as typed:

```ts
const first: string = "ada";
const last: string = "lovelace";

console.log(first);
```

Start from the code above, in your own file. Write a function `capitalize` that returns a word with its first letter in capitals. Then write a function `fullName` that takes a first and a last name, uses `capitalize` on each, and returns them joined with a space. Print the result of `fullName` for these names. The output should be:

```
Ada Lovelace
```

## Hints

- `charAt(0)` gives the first letter, and `slice(1)` gives the rest. Chapter 3 covered both.
- A function can call another function, as `fullName` calls `capitalize`.

## When you're stuck

Show the solution. It's a spoiler, so give it a proper attempt in your own file first.

## Quiz

```quiz
Why write `capitalize` as its own function, rather than tidying each name inline?
○ Because a function is faster than a line of code.
→ Not quite. The reason is reuse, not speed.
◉ Because the same tidying is needed for both names, so it's written once and called twice.
→ Right. A function written once can be used wherever the same job is needed.
○ Because the checker requires a separate function for each name.
→ Not quite. The checker has no such requirement. The reason is avoiding repeated code.
```
