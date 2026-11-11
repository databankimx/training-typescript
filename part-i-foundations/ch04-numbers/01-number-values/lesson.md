# Number values

A number is the simplest kind of value there is, which is exactly why people are so willing to trust it. This step shows what you can do with one, and how the checker tells a whole number from a decimal.

> **Coming from JavaScript:** JavaScript has one number type for whole and decimal numbers, and TypeScript uses the same type. The `: number` label is the TypeScript part.

## Whole numbers and decimals

A **number** can be whole, such as `42`, or have a decimal part, such as `19.99`. Both kinds have the type `number`. The program in `main.ts` uses both:

```ts
const count: number = 42;
const price: number = 19.99;
```

Press **Run**. You should see:

```
43
true
false
```

- **`count + 1`** adds one to `42`, so the result is `43`. You can calculate with numbers directly, unlike text.
- **`Number.isInteger(count)`** asks whether the number is a whole number. `42` is, so the answer is `true`.
- **`Number.isInteger(price)`** asks the same question about `19.99`. It isn't a whole number, so the answer is `false`.

The name `Number.isInteger` has a dot in it. `Number` is a built-in group of number tools, and `isInteger` is one of them. You'll see the same pattern with `Math` in a later step.

## Numbers are not text

Put quotes around a number and it becomes text, which the checker treats as a different kind of value. Try `const count: number = "42";` and press **Check**. The checker reports that text can't be used where a number is expected. Chapter 3 showed how text and numbers differ.

## Try it

- Change `count + 1` to `count * 2`. What's printed?
- Check whether `100` is a whole number, using `Number.isInteger`.
- Change `price` to `20`, and check it again. Does the answer change?

## Quiz

```quiz
What does `Number.isInteger(19.99)` give you?
○ true
→ Not quite. `19.99` has a decimal part, so it isn't a whole number.
◉ false
→ Right. The function answers yes only for whole numbers.
○ 19
→ Not quite. `isInteger` gives a yes or no answer, not a number.
```

```quiz
Which of these is a number?
○ "42"
→ Not quite. The quotes make it text.
◉ 42
→ Right. Without quotes, it's a number, and you can calculate with it.
○ "forty-two"
→ Not quite. That's text, and it's not even digits.
```
