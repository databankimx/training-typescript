# Comments

> **Coming from JavaScript:** TypeScript uses the same comment syntax as JavaScript, with `//` and `/* */`.

**Before you start:** complete Printing values

Programs are read by computers, and also by people. A **comment** is a note in the code, written for the people who read it. The computer skips comments, so they never change what the program does.

## Two kinds of comment

The file in `main.ts` has both kinds:

```ts
// A line comment starts with two slashes and runs to the end of the line.
const greeting = "Hello"; // A comment can follow code on the same line.

/*
  A block comment starts with a slash and a star,
  and ends with a star and a slash.
  It can run across several lines.
*/
console.log(greeting);
```

- A **line comment** starts with `//`. Everything after the slashes, up to the end of the line, is ignored.
- A **block comment** starts with `/*` and ends with `*/`. Everything in between is ignored, even across several lines.

Press **Run**. You should see `Hello`, and nothing else. The comments were skipped.

## What makes a good comment

A good comment explains why the code is written the way it is. Compare these two:

```ts
const total = price * 2; // multiply the price by 2
```

```ts
const total = price * 2; // the offer is two for the price of one
```

The first comment says what the code already says, so it adds nothing. The second explains a decision that the code can't show. A reader who sees the second comment understands the purpose of the line.

## Don't leave old code in comments

If you want to stop a line running while you test something, you can put `//` in front of it. Once you've decided, delete the line rather than leaving it commented out. A file full of old, commented-out code is hard to read.

## Try it

- Add a line comment above `const greeting` that explains why the name is `greeting`.
- Put `//` in front of `console.log(greeting);`, and press **Run**. What is printed now?
- Change the text to `"Hello // there"`, and run it. Does the output include the `//`? Why or why not?

## Quiz

```quiz
Which of these is a comment?
○ console.log("// Hello");
→ Not quite. The slashes are inside quotes, so they're part of the text, and the line shows them.
◉ // Print the greeting
→ Right. Everything after the two slashes is ignored by the computer.
○ const greeting = "Hello"
→ Not quite. That's an instruction, which the computer reads and carries out.
```

```quiz
Why is `// multiply the price by 2` a weak comment?
○ It's too short.
→ Not quite. Length isn't the problem.
◉ It repeats what the code already says, so it doesn't help the reader.
→ Right. A good comment explains why, because the code already shows what.
○ Computers ignore comments, so they don't matter.
→ Not quite. The computer ignores them, but the people who read the code don't.
```
