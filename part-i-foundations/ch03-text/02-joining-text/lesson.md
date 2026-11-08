# Joining text

Joining text sounds simple until you try to build a sentence with a name in the middle of it. This step shows two ways to do it, and why one of them leaves you wondering which quote went where.

> **Coming from JavaScript:** the `+` sign and template strings work the same way. Both are part of JavaScript, and the checker reads them the same way too.

## Joining with `+`

You can join two pieces of text with the plus sign. The program in `main.ts` does this to make a full name:

```ts
const full: string = first + " " + last;
```

The `+` sticks the pieces together in order, and the space in quotes goes between the names. The result is `Ada Lovelace`.

The `+` sign only joins text when both sides are text. If one side is a number, the result can surprise you. `"Room " + 4` gives `Room 4`, but `4 + 4` gives `8`, because both sides are numbers. This is one more reason to keep the types of your values clear.

## Building text with a template string

A **template string** is text in backticks, with `${}` pieces that hold values:

```ts
const greeting: string = `Hello, ${full}!`;
```

The `${full}` part is replaced by the text in `full`. The result is `Hello, Ada Lovelace!`.

Template strings are easier to read when a sentence has more than one value in it, because the sentence looks like the text you want to see.

## The program

Press **Run**. You should see:

```
Ada Lovelace
Hello, Ada Lovelace!
```

## Try it

- Add a `middle` value, such as `"Augusta"`, and join three names with `+`. Then do the same with one template string. Which one is easier to read?
- Change the template string to end with `${last}!` instead of `${full}!`. What changes in the output?
- Write `const label: string = "Room " + 4;`, and press **Check**. Does the checker report a problem? What does `console.log` show?

## Quiz

```quiz
If `first` holds `"Ada"` and `last` holds `"Lovelace"`, what is `first + " " + last`?
○ AdaLovelace
→ Not quite. The space in quotes is what puts a gap between the names.
◉ Ada Lovelace
→ Right. The pieces are joined in order, with the space between them.
○ "Ada" "Lovelace"
→ Not quite. The quotes aren't part of the joined text.
```

```quiz
What does the `${...}` part do inside a template string?
○ It stops the text from changing.
→ Not quite. It puts a value into the text.
◉ It's replaced by the value inside it.
→ Right. A template string fills each `${...}` with the value, so the text can be built from values.
○ It joins two numbers together.
→ Not quite. It works with any value, and it joins it into text.
```
