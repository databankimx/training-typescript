# For loops

A `while` loop works well when you don't know in advance how many passes you need. When you do know, a `for` loop is clearer, because it keeps the three parts of the loop in one place: where the counter starts, the condition that keeps the loop going, and the change made after each pass.

> **Coming from JavaScript:** `for` loops are the same in both languages. The `number` label on the counter is the TypeScript part.

## The program

The program is already in `main.ts`:

```ts
let total: number = 0;

for (let i: number = 1; i <= 5; i++) {
  total = total + i;
}

console.log(total);
```

Press **Run**. You should see `15`, which is `1 + 2 + 3 + 4 + 5`.

The three parts of the header, between the brackets, are separated by semicolons:

- **`let i: number = 1`** runs once, before the loop starts. It creates the counter.
- **`i <= 5`** is checked before each pass. The loop stops when it's no.
- **`i++`** runs after each pass. `i++` adds one to `i`, which is shorthand for `i = i + 1`.

The counter `i` exists only inside the loop. Once the loop ends, `i` can't be used outside it, which keeps the names tidy.

## Choosing between while and for

Use `for` when the loop runs a counted number of times, or when you're visiting each position in order. Use `while` when the loop depends on something else changing, such as waiting for a value to arrive. Either works for a counted loop, but `for` puts the counting in one place, so a reader doesn't have to hunt for the change.

## Try it

- Change `5` to `10`, and run. What total do you get?
- Change `i++` to `i += 2`. What does the loop add up now?
- Count down instead: start `i` at `5`, use `i >= 1`, and change `i++` to `i--`. Does the total change?

## Quiz

```quiz
What does `i++` do in the header of a `for` loop?
○ It changes `i` once, before the loop starts.
→ Not quite. That's the job of the first part, the starting value.
◉ It adds one to `i` after each pass.
→ Right. `i++` is shorthand for `i = i + 1`, and it runs after each pass.
○ It stops the loop.
→ Not quite. The condition in the middle of the header decides when the loop stops.
```

```quiz
Why can't `i` be used after the loop ends, in `for (let i: number = 1; ...)`?
○ Because the checker deletes it.
→ Not quite. The checker doesn't change the program.
◉ Because `let` limits `i` to the loop, so it only exists inside it.
→ Right. The counter belongs to the loop, which keeps the names tidy.
○ Because numbers can't be stored after a loop.
→ Not quite. Numbers can be stored, and `let` controls where the name is visible.
```
