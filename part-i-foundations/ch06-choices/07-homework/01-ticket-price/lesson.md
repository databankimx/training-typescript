# Homework: ticket price

A cinema charges by age: children under 12 pay 6, adults from 12 to 64 pay 12, and people aged 65 and over pay 8. The ranges are the same kind of problem as the grade bands in the else if step, so the same tool works.

> **Coming from JavaScript:** `let`, `if`, and `else if` work the same way in both languages. The `: number` labels are the TypeScript part.

## The task

Here is the starting code, which prints the age of a customer:

```ts
const age: number = 30;

console.log(age);
```

Start from the code above, in your own file, and change it so that it prints the ticket price for that age:

- under 12: 6
- from 12 to 64: 12
- 65 and over: 8

With the age above, the answer should be `12`.

## Hints

- Check the youngest range first, then the next, then use the final `else` for the rest.
- If you want to keep the price in a variable, declare it with `let`, and give it a value in every branch.

## When you're stuck

Show the solution. It's a spoiler, so give it a proper attempt in your own file first.

## Quiz

```quiz
Why check `age < 12` before `age < 65` in the chain?
○ Because the checker needs the smallest number first.
→ Not quite. The checker doesn't care about the order. The program does.
◉ Because the first yes wins, so the youngest range must be checked first.
→ Right. Once a range matches, the rest are skipped, so the order decides the price.
○ Because `age < 65` would be an error.
→ Not quite. It's a valid check, but in the wrong place it gives the wrong price.
```
