## Summary: Text

These are the basic ideas from this chapter.

* **Text is a string.** It's written in quotes, and the quotes mark where it starts and stops.
* **Text can be joined and built.** The `+` sign joins text, and a template string fills `${...}` pieces with values.
* **A method is an action a value can do.** You call one with a dot, a name, and brackets, such as `raw.trim()`.
* **Methods give back new text.** The original text doesn't change.
* **Positions start at 0.** Searching and cutting both count from there.
* **A backslash makes a special character.** `\n` starts a new line, and `\"` puts a quote inside text.

### Check your understanding

*These questions are written for this course.*

```quiz
What does `"Hello".length` give back?
○ "Hello"
→ Not quite. `length` gives a number.
◉ 5
→ Right. There are five characters in the text.
○ 4
→ Not quite. Count each letter, including the first and the last.
```

```quiz
Which method returns a new string with the spaces at the ends removed?
○ removeSpaces()
→ Not quite. That method doesn't exist. The method is named `trim`.
◉ trim()
→ Right. `trim` removes spaces from the start and end, and gives back the result.
○ split()
→ Not quite. `split` breaks text into pieces. It doesn't remove spaces.
```

```quiz
What is the position of the first letter of a string?
○ 1
→ Not quite. Positions start at 0 in TypeScript.
◉ 0
→ Right. The first character is at position 0.
○ -1
→ Not quite. `-1` means "not found" when you search, and the last character when you cut.
```
