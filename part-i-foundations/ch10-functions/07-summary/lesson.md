## Summary: Functions

Functions are how a program is divided into named, reusable pieces. The labels on each piece tell the checker, and the next reader, what goes in and what comes out.

* **A function takes inputs and gives back a result.** `return` sends the result to the caller, and `: void` marks a function that returns nothing.
* **Parameters can have defaults or be optional.** A default is used when the caller leaves a value out, and an optional parameter is `undefined` in that case.
* **Arrow functions are a shorter form.** Use a block body with `return` when the function needs more than one line.
* **A function is a value.** It can be passed to another function, which calls it, as a callback.
* **Scope decides what a name can see.** Names inside a function are local to it, and names at the top of the file are visible below.

### Check your understanding

*These questions are written for this course.*

```quiz
A function is labeled `: void`. What does a caller get back?
○ A number.
→ Not quite. A `void` function gives back no value.
◉ No value, so there's no result to store.
→ Right. The function does its work, and nothing is returned.
○ Text.
→ Not quite. A `void` function doesn't return text either.
```

```quiz
What is the difference between `add(2, 3)` and `add`, when `add` is a function?
○ There is none. They both run the function.
→ Not quite. `add(2, 3)` runs the function, and `add` is the function itself.
◉ `add(2, 3)` runs the function, and `add` is the function as a value that can be passed.
→ Right. The brackets are what run the function.
○ `add` runs the function and `add(2, 3)` is a mistake.
→ Not quite. `add(2, 3)` is the usual way to run it.
```

```quiz
Which name can a function read from the top of its file, when the name is declared there?
○ None. Names at the top can't be used by functions.
→ Not quite. Functions below a name can read it.
◉ Any name declared above it, at the top level of the file.
→ Right. A name at the top of the file is visible to every function below it.
○ Only names it declares itself.
→ Not quite. A function can also read names declared outside it, above it in the file.
```
