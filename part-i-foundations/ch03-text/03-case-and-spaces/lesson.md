# Changing case and spaces

Users type what they like, including too many spaces and the occasional shouting capitals. This step shows how to tidy a value before you rely on it, which is a habit worth forming early.

> **Coming from JavaScript:** `trim`, `toUpperCase`, and `toLowerCase` are the same methods in both languages. The string type is the TypeScript part.

## Methods: things a value can do

Earlier you used `greeting.length` to ask a string for its length. A **method** is the same idea, but it does something: it's a named action a value can perform. You call a method with a dot, the method's name, and a pair of brackets, like this:

```ts
const cleaned: string = raw.trim();
```

The brackets are where you'd give the method extra information. `trim()` doesn't need any, so its brackets are empty.

## The program

The program is already in `main.ts`:

```ts
const raw: string = "   Dallas, TX   ";
const cleaned: string = raw.trim();

console.log(cleaned.toUpperCase());
console.log(cleaned.toLowerCase());
```

Press **Run**. You should see:

```
DALLAS, TX
dallas, tx
```

Here's what each method does:

- **`trim()`** removes the spaces from the start and the end of the text. It doesn't change the spaces in the middle. The original `raw` is still unchanged, because `trim()` gives back a new string.
- **`toUpperCase()`** returns a copy with every letter in capitals.
- **`toLowerCase()`** returns a copy with every letter in small letters.

Those are the methods that change the text. The original value stays the same, so if you want to keep the cleaned version, store it in a box, as the program does with `cleaned`.

## Why trimming matters

Text from a form often has extra spaces at the start or end, because someone typed a space by accident. A program that compares the text with `"Dallas, TX"` would reject it, even though the user meant the same place. Trimming first makes the comparison reliable.

## Try it

- Add a line that prints `raw.length` and `cleaned.length`. Why are the two numbers different?
- Change `raw` so the spaces are in the middle, such as `"Dallas,    TX"`. Does `trim()` remove them?
- Call `cleaned.toUpperCase()` twice in one line. Does the second call change the result?

## Quiz

```quiz
What does `trim()` remove?
○ Every space in the text.
→ Not quite. `trim()` only removes spaces from the start and the end.
◉ Spaces at the start and the end of the text.
→ Right. The spaces inside the text are left alone.
○ The last character.
→ Not quite. `trim()` removes spaces, not characters.
```

```quiz
After `const cleaned = raw.trim();`, what is still true about `raw`?
○ It has been trimmed.
→ Not quite. `trim()` returns a new string, and leaves `raw` as it was.
◉ It hasn't changed.
→ Right. Methods like `trim()` give back a new string, and the original stays the same.
○ It's now a number.
→ Not quite. It's still text, and it's still the same text.
```
