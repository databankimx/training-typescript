# While loops

A `while` loop is the simplest kind of loop. It checks a condition, runs its block if the answer is yes, and checks again. It keeps going until the answer is no. The condition is the same question you've been asking since the last chapter. The difference is that the program asks it over and over.

> **Coming from JavaScript:** `while` loops are the same in both languages. The `number` label on `count` is the TypeScript part.

## The program

The program is already in `main.ts`:

```ts
let count: number = 1;

while (count <= 3) {
  console.log(`Count is ${count}`);
  count = count + 1;
}
```

Press **Run**. You should see:

```
Count is 1
Count is 2
Count is 3
```

Here is one pass through the loop:

1. The program checks `count <= 3`. It's `1`, so the answer is yes.
2. It runs the block: it prints `Count is 1`, then adds one to `count`, which is now `2`.
3. It checks the condition again, and so on, until `count` is `4`.

At that point the condition is no, and the loop ends.

## The rule that prevents infinite loops

A loop must change something that the condition depends on. Here, `count = count + 1` moves the counter towards the end. If you removed that line, `count` would stay at `1` forever, and the program would never finish. Press **Stop** in the runner if that ever happens. The runner also stops any program that runs for ten seconds.

When you write a loop, ask yourself two questions: what changes on each pass, and what makes the condition false?

## Try it

- Change `3` in the condition to `5`, and run. How many lines do you get?
- Change `count = count + 1;` to `count = count + 2;`. What's printed now?
- Remove the line that changes `count`, and run. Then press **Stop**. Why does the program never finish?

## Quiz

```quiz
How many times does the body of this loop run? `let n: number = 1; while (n <= 3) { n = n + 1; }`
○ 2
→ Not quite. Count the passes: the body runs while `n` is 1, 2, and 3.
◉ 3
→ Right. The condition is checked before each pass, so the body runs for `n` equal to 1, 2, and 3.
○ 4
→ Not quite. When `n` reaches 4, the condition is no, so the fourth pass never happens.
```

```quiz
What happens if a `while` loop's condition never becomes false?
○ The checker stops the loop.
→ Not quite. The checker doesn't run the loop, so it can't stop it.
◉ The loop keeps running, unless the program is stopped.
→ Right. A loop that never ends is an infinite loop, and the runner stops it after ten seconds.
○ The loop runs once, then stops.
→ Not quite. A `while` loop checks its condition before every pass, not just once.
```
