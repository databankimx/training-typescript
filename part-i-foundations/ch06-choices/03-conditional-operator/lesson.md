# The conditional operator

Sometimes a choice is small enough to sit inside a single line. You want a label or a price, and the only difference is which of two values to use. An `if` statement would take four lines for that. The conditional operator does it in one, and it's the operator you'll see in code that's been written with care.

> **Coming from JavaScript:** the conditional operator is the same in both languages. Its result has a type, which the checker works out from the two values.

## The program

The program is already in `main.ts`:

```ts
const age: number = 17;

const ticket: string = age >= 18 ? "adult" : "child";
console.log(ticket);
console.log(age >= 18 ? "can vote" : "cannot vote yet");
```

Press **Run**. You should see:

```
child
cannot vote yet
```

Read the line with the question mark from left to right:

- **`age >= 18`** is the condition.
- **`?`** separates the condition from the answer for yes.
- **`"adult"`** is the answer if the condition is yes.
- **`:`** separates the yes answer from the no answer.
- **`"child"`** is the answer if the condition is no.

The whole expression produces one value, which is stored in `ticket`. The first line gives `child`, because `17` isn't at least `18`.

## When to use it

Use the conditional operator to choose a value. Use `if` to choose actions. If each branch only sets a value or returns one, the conditional operator is usually clearer. If each branch does several things, an `if` statement is clearer.

Don't nest conditional operators several levels deep. A reader has to work out which `?` belongs to which `:`, and an `if` chain is easier to follow.

## Try it

- Change `age` to `18`, and check both lines. Which answers change?
- Write a line that prints `"free"` when `age` is under 5, and `"paid"` otherwise.
- Nest a second conditional inside the first one, and count how long it takes you to read it. Would an `if` chain be clearer?

## Quiz

```quiz
What does `age >= 18 ? "adult" : "child"` give when `age` is `18`?
○ `"child"`
→ Not quite. `18` is at least `18`, so the condition is yes.
◉ `"adult"`
→ Right. The condition is yes, so the answer before the colon is used.
○ `true`
→ Not quite. The conditional operator returns one of the two values, not the condition itself.
```

```quiz
Which is the better choice for a branch that sets several variables and prints a message?
○ The conditional operator, because it's shorter.
→ Not quite. Short isn't the same as clear, and this branch does several things.
◉ An `if` statement, because it can hold several instructions.
→ Right. An `if` statement can run as many instructions as the branch needs.
○ Neither. The program can't choose between actions.
→ Not quite. `if` statements exist to choose between actions.
```
