# Printing values

> **Coming from JavaScript:** `console.log`, template strings, and arithmetic work the same as in JavaScript. The `const` keyword does too.

**Before you start:** complete Hello, world!

So far, each program has printed one line of text. Real programs work with **values**, and they show those values as they go. This step shows how.

## What is a value?

A **value** is a piece of data a program works with. The two kinds you'll meet most in this course are:

- **Numbers**, such as `1300000`. You can calculate with them.
- **Text**, such as `"Dallas"`. Text is written in quotes, so the program knows where it starts and stops.

## The program

The program is already in `main.ts`:

```ts
const city = "Dallas";
const population = 1300000;

console.log("City:", city);
console.log(`Population: ${population}`);
console.log(population * 2);
```

Press **Run**. You should see:

```
City: Dallas
Population: 1300000
2600000
```

Here is what each line does.

- **`const city = "Dallas";`** creates a named box called `city`, and puts the text `Dallas` in it. `const` means the box holds that value for the rest of the program. The `=` sign puts the value in the box. It doesn't mean "equals" in the sense of maths.
- **`console.log("City:", city);`** shows two values: the text `City:`, and whatever is in the box called `city`. A space goes between them, so the output is `City: Dallas`.
- **`` `Population: ${population}` ``** is a **template string**, which is text in backticks. The part `${population}` is replaced by the value inside the `population` box.
- **`population * 2`** is a calculation. The `*` means multiply, so the program shows `2600000`.

## Text and numbers are different

Put quotes around a number and it becomes text. Try this: change the line that creates `population` to:

```ts
const population = "1300000";
```

Press **Check**. The checker reports that you can't multiply text. Now press **Run**. The output still shows `2600000`, because Node quietly converts the text to a number before it multiplies. The program looks correct, but the checker has found a mistake that Node hid. That's why it's worth checking as well as running. Change the value back to a number without quotes.

## Try it

- Change `city` to the name of your own city, and run the program again.
- Add a line that shows `population / 1000`. The `/` means divide. What is the output?
- Add a line that shows `population * 2` inside a sentence, using a template string.

## Quiz

```quiz
If `city` holds `Dallas`, what does `console.log("City:", city);` show?
○ City:Dallas
→ Not quite. The program puts a space between the values, so there's a space after `City:`.
◉ City: Dallas
→ Right. The two values are shown with a space between them.
○ "City:" Dallas
→ Not quite. The quote marks are part of the instruction, and they aren't shown.
```

```quiz
Which of these is a number, and can be used in a calculation?
○ "1300000"
→ Not quite. The quotes make it text, so it can't be multiplied.
◉ 1300000
→ Right. Without quotes, the value is a number.
○ "population"
→ Not quite. That's text, and it's the name of a box, not a number.
```

```quiz
What does `${population}` do inside a template string?
○ It shows the word population.
→ Not quite. It shows the value stored in the population box.
◉ It's replaced by the value stored in the population box.
→ Right. The program puts the value in place of the `${...}` part.
○ It stops the program.
→ Not quite. Template strings are a way of building text, and they don't stop anything.
```
