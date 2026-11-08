# Text values

Text is the first kind of value most people reach for, and it turns out to be more complicated than it looks. It has a length, it has quotes, and it refuses to be multiplied, which the checker will be happy to point out.

> **Coming from JavaScript:** strings are the same in both languages. The `: string` label is the TypeScript part, and Node ignores it when the program runs.

## What is text?

Text in a program is called a **string**. It's a sequence of characters, such as letters, digits, spaces, and punctuation. You make a string by putting the characters between quotes.

The quotes don't belong to the text. They mark where it starts and stops. Both double quotes (`"Hello"`) and single quotes (`'Ada'`) work. The course uses double quotes, and the checker accepts either.

## The program

The program is already in `main.ts`:

```ts
const greeting: string = "Hello";
const name: string = 'Ada';

console.log(greeting.length);
console.log(name);
```

Press **Run**. You should see:

```
5
Ada
```

Here's what each line does:

- **`const greeting: string = "Hello";`** puts the text `Hello` in a box called `greeting`. The label `: string` says the box holds text.
- **`greeting.length`** asks the text how many characters it has. `Hello` has five, so the answer is `5`.
- **`console.log(name);`** shows the text in `name`. The quotes are not part of the output.

The dot in `greeting.length` is how you ask a value for something it knows about itself. Text knows its length, and later steps use other things it knows, such as how to change its case.

## Try it

- Change `greeting` to your own word, and check the length it prints.
- Add a line that prints `name.length`. What's the answer for `Ada`, and why is it different from `Hello`?
- Change the label on `name` to `: number`, and press **Check**. What does the checker say about the value `'Ada'`?

## Quiz

```quiz
What does `greeting.length` give you, if `greeting` holds `"Hello"`?
○ "Hello"
→ Not quite. `length` gives a number, not the text itself.
◉ 5
→ Right. The text has five characters, and `length` counts them.
○ 6
→ Not quite. Count the letters again. There's no space in `Hello`.
```

```quiz
Which of these is text, rather than a number?
○ 42
→ Not quite. Without quotes, that's a number.
◉ "42"
→ Right. The quotes make it text, even though the characters are digits.
○ 42 + 1
→ Not quite. That's a calculation, so it produces a number.
```
