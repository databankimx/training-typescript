# Nested loops

A loop can sit inside another loop. The inner loop runs in full once for every pass of the outer loop. That's how you build a table, check every pair of items, or walk a grid. The idea is simple. Keeping track of which loop you're in is where most mistakes happen.

> **Coming from JavaScript:** nested loops work the same way in both languages. The `string` and `number` labels are the TypeScript part.

## The program

The program is already in `main.ts`:

```ts
for (let row: number = 1; row <= 3; row++) {
  let line: string = "";
  for (let col: number = 1; col <= 3; col++) {
    line = line + `${row * col} `;
  }
  console.log(line.trim());
}
```

Press **Run**. You should see a three-by-three table:

```
1 2 3
2 4 6
3 6 9
```

Follow one pass of the outer loop, when `row` is `2`:

1. `line` is cleared to empty text.
2. The inner loop runs three times, with `col` as `1`, `2`, and `3`. Each pass adds `row * col` to `line`, giving `2 4 6` with a trailing space.
3. `line.trim()` removes the trailing space, and the row is printed.

Then the outer loop moves on to `row` as `3`, and the whole inner loop runs again.

## Keeping the loops straight

Give each loop variable a name that says what it counts. `row` and `col` make it clear which loop each one belongs to. Single letters are fine for short loops, but they become hard to follow when the loops are long or nested more deeply.

Notice that `line` is declared inside the outer loop, so each row starts with a fresh value. If it were declared outside, the rows would keep adding to the same text.

## Try it

- Change the outer loop to `row <= 4` and the inner loop to `col <= 4`. What does the table look like?
- Move `let line: string = "";` above the outer loop, and run. What's printed now, and why?
- Print the numbers in a single row, without a line break, by using `process.stdout.write` in place of `console.log`. Then add the line break yourself.

## Quiz

```quiz
When `row` is `2`, how many times does the inner loop run?
○ 2
→ Not quite. The inner loop counts from `1` to `3` each time, so it runs three times.
◉ 3
→ Right. The inner loop runs in full for each pass of the outer loop, and it counts from 1 to 3.
○ 6
→ Not quite. That's the total number of passes across both loops, but the inner loop restarts each time.
```

```quiz
Why is `let line: string = "";` placed inside the outer loop?
○ Because the checker requires it there.
→ Not quite. The checker doesn't set where variables go.
◉ So each row starts with an empty line, instead of adding to the previous row's text.
→ Right. A variable declared inside a loop is fresh on each pass of that loop.
○ Because `line` can't be used outside a loop.
→ Not quite. Variables can be used outside loops. The position matters for keeping rows separate.
```
