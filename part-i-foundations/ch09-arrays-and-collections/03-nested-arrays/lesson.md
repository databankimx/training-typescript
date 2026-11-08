# Nested arrays

A list can hold other lists. A grid of seats, a table of results, and a timetable are all lists of rows, where each row is a list of values. The label `number[][]` says the outer list holds lists, and those hold numbers. Read it from the inside out, one pair of brackets at a time.

> **Coming from JavaScript:** nested arrays are the same in both languages. The `[][]` in the label is the TypeScript part.

## The program

The program is already in `main.ts`:

```ts
const grid: number[][] = [
  [1, 2, 3],
  [4, 5, 6],
];

console.log(grid[1][2]);
console.log(grid.length);

for (const row of grid) {
  console.log(row.join(" "));
}
```

Press **Run**. You should see:

```
6
2
1 2 3
4 5 6
```

Here is what each part means:

- **`grid[1]`** is the second row, `[4, 5, 6]`. Positions start at zero, so `1` is the second row.
- **`grid[1][2]`** takes the item at position `2` of that row, which is `6`. Read each pair of brackets in turn.
- **`grid.length`** counts the rows, which is `2`.
- **The loop** visits each row, and `row.join(" ")` prints it with spaces between the values.

The list is written over several lines because it's long enough to be clearer that way. The trailing comma after the last row is allowed, and it makes the next row easier to add.

## Try it

- Read `grid[0][0]`, and then `grid[0][3]`. What does the second one show?
- Add a third row, `[7, 8, 9]`, and check that the loop prints it.
- Change `grid[1][2]` to `grid[2][0]` after adding the third row. What's printed?

## Quiz

```quiz
In `grid[1][2]`, which row is used first?
○ Row `2`, the third row.
→ Not quite. The first pair of brackets picks the row, and the position in it starts at zero.
◉ Row `1`, the second row.
→ Right. The first brackets pick the row, counted from zero, so `1` is the second row.
○ Row `6`, the value.
→ Not quite. `6` is the value found at the end, not a row.
```

```quiz
What does `number[][]` mean?
○ A list of numbers, with two items.
→ Not quite. The two pairs of brackets describe a list of lists, not a fixed length.
◉ A list whose items are lists of numbers.
→ Right. The outer list holds lists, and each of those holds numbers.
○ A pair of numbers.
→ Not quite. A pair is a tuple, which has its own label, covered in the next step.
```
