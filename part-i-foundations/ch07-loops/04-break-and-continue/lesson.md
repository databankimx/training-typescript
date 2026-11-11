# Break and continue

Sometimes a loop needs to change course partway through. You might want to skip one item, or stop altogether once you've found what you were looking for. `continue` and `break` do those two jobs, and they're short enough to read at a glance.

> **Coming from JavaScript:** `break` and `continue` are the same in both languages. The `number[]` label on the list is the TypeScript part.

## The program

The program is already in `main.ts`:

```ts
const numbers: number[] = [4, 7, -1, 9, 12];

for (const n of numbers) {
  if (n < 0) {
    break;
  }
  if (n % 2 === 0) {
    continue;
  }
  console.log(n);
}
```

Press **Run**. You should see:

```
7
9
```

Here is what happens to each item:

- **`4`** is even, so `continue` skips to the next item without printing it.
- **`7`** is odd, so it's printed.
- **`-1`** is negative, so `break` leaves the loop. The remaining items, `9` and `12`, are never looked at.

`n % 2` is the remainder after dividing by two, so `n % 2 === 0` is a way of asking whether `n` is even. You'll meet `%` again in the homework.

## Which one to use

- **`continue`** skips the rest of the current pass, and the loop carries on. Use it to ignore items that don't matter.
- **`break`** leaves the whole loop. Use it when the loop's job is finished, such as after you've found the item you were looking for.

Both keep the loop readable, as long as they're near the top of the loop body. If a loop has several `break` and `continue` statements scattered through it, the flow becomes hard to follow.

## Try it

- Move `-1` to the end of the list, and run. What's printed now?
- Change `n < 0` to `n > 10`. Which numbers are printed, and where does the loop stop?
- Remove the `continue` lines, and run. Why is `4` now printed?

## Quiz

```quiz
What does `continue` do inside a loop?
○ It leaves the loop.
→ Not quite. That's `break`.
◉ It skips the rest of this pass and moves to the next item.
→ Right. The loop carries on, but the current pass ends early.
○ It starts the loop again from the beginning of the list.
→ Not quite. The loop moves on to the next item, and doesn't restart.
```

```quiz
In the program above, why is `9` printed, but `12` isn't?
○ Because `12` is larger than `9`.
→ Not quite. Size isn't the reason.
◉ Because `break` stopped the loop at `-1`, before `12` was reached.
→ Right. The loop ended at `-1`, so the later items are never checked.
○ Because `9` is odd and `12` is even.
→ Not quite. `12` is even, so `continue` would skip it, but that's not why it's missing. The `break` at `-1` stopped the loop first.
```
