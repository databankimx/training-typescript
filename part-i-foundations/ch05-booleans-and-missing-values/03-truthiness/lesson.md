# Truthy and falsy values

Sometimes a program doesn't want an explicit yes or no. It just wants to know whether a value has anything in it: a name typed into a form, a count that isn't zero, a list with items in it. JavaScript and TypeScript answer that question for every value, and the answer is the same for every kind of value.

> **Coming from JavaScript:** this is the same rule in both languages. The checker doesn't change how values behave when a program checks them.

## Yes and no for any value

A value is **truthy** if a program treats it as yes, and **falsy** if it treats it as no. Most values are truthy. The falsy ones are a short list:

- `false`, which is already no.
- `0`, and the number `NaN`, which means "not a number".
- `""`, the empty text.
- `null` and `undefined`, which mean there's no value. You'll meet these properly later in the chapter.

Everything else is truthy, including the text `"0"` and the text `"false"`. Those are text, and text with characters in it is yes.

## Acting on the answer

An `if` statement runs a block of code when a condition is yes:

```ts
if (name) {
  console.log("has a name");
} else {
  console.log("no name");
}
```

The `name` in the brackets is the condition. It's empty, so it's falsy, and the program goes to the `else` block and prints `no name`. The braces mark which instructions belong to each branch.

## Converting to a plain yes or no

`Boolean` turns any value into `true` or `false`, using the same rule:

```ts
console.log(Boolean(0));
console.log(Boolean("hello"));
```

`Boolean(0)` is `false`, and `Boolean("hello")` is `true`. If you need an actual boolean rather than a value that acts like one, this is the function to reach for.

## Press Run

The program is already in `main.ts`. You should see:

```
no name
false
true
```

## Try it

- Change `name` to `"Ada"`, and run the program again. Which branch runs now?
- Use `Boolean("")` and `Boolean(" ")`. Why are the answers different, when both texts look empty?
- Use `Boolean(NaN)`. What do you get?

## Quiz

```quiz
Which of these is falsy?
○ `"0"`
→ Not quite. Text with any characters in it is truthy, even if the characters are digits.
◉ `0`
→ Right. The number zero is one of the falsy values.
○ `"false"`
→ Not quite. That's text, and any text with characters in it is truthy.
```

```quiz
What does `if (name) { ... } else { ... }` run when `name` is an empty string?
○ The block in the braces after `if`.
→ Not quite. An empty string is falsy, so the program skips that block.
◉ The block after `else`.
→ Right. A falsy condition takes the else branch.
○ Both blocks.
→ Not quite. An if statement runs one branch or the other.
```
