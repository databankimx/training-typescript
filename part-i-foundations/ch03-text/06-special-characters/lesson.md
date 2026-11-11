# Special characters

Some characters can't be typed directly inside quotes: quotes, new lines, and tabs among them. This step covers how to write them using a backslash, and why the backslash itself then needs care.

> **Coming from JavaScript:** escape characters are the same in both languages.

## The problem

Text is written inside quotes, so what happens when the text itself needs a quote? If you write `"She said "hello""`, the program sees the quote after `said` as the end of the text. The rest is a mistake, and the checker will say so.

A new line is a different problem. You can't press Enter inside a string and have it stay on one line of code, so you need another way to say "start a new line here".

## The escape character

A **backslash** (`\`) tells the program that the character after it is special. Together they're called an **escape sequence**:

| You write | You get |
|---|---|
| `\"` | a double quote |
| `\n` | a new line |
| `\t` | a tab |
| `\\` | a single backslash |

## The program

The program is already in `main.ts`:

```ts
console.log("Line one\nLine two");
console.log("She said \"hello\"");
console.log("Tab\there");
```

Press **Run**. You should see:

```
Line one
Line two
She said "hello"
Tab	here
```

The `\n` makes the first line end and the second line begin. The `\"` lets a quote sit inside the text, without ending it. The `\t` moves the text across to the next tab stop.

## Try it

- Add a line that prints a backslash, using `\\`. What happens if you write a single backslash instead?
- Change the text to use single quotes, such as `'She said "hello"'`. Does it still need escapes?
- Put `\n` in the middle of a word, and run. Where does the line break?

## Quiz

```quiz
What does `\n` do inside a string?
○ It prints the letter n.
→ Not quite. The backslash makes the `n` special.
◉ It starts a new line.
→ Right. The escape sequence is replaced by a line break.
○ It ends the string.
→ Not quite. The quotes end the string. The backslash doesn't.
```

```quiz
Which line prints a quote inside a double-quoted string?
○ `console.log("She said "hi"");`
→ Not quite. The quote before `hi` ends the text early, and the program can't read the rest.
◉ `console.log("She said \"hi\"");`
→ Right. The backslash tells the program that the quote is part of the text.
○ `console.log("She said \hi\");`
→ Not quite. The backslash has to come before the quote, not before the word.
```
