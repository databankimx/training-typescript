# Homework: countdown

A launch controller counts down from three, one number per second, and then announces the launch. The loop needs to print each number, make the number smaller, and stop when it reaches zero, and the announcement comes after the loop has finished.

> **Coming from JavaScript:** `while` and the decrement operator work the same way in both languages. The `number` label is the TypeScript part.

## The task

Here is the starting code, which prints the first number of the countdown:

```ts
let n: number = 3;

console.log(n);
```

Start from the code above, in your own file, and change it so that it prints the countdown and then the announcement. The output should be:

```
3
2
1
Liftoff!
```

## Hints

- A `while` loop can run while `n` is greater than zero.
- Inside the loop, print `n` and then make it one smaller.
- The announcement goes after the loop, so it prints once, when the loop has finished.

## When you're stuck

Show the solution. It's a spoiler, so give it a proper attempt in your own file first.

## Quiz

```quiz
Where should `console.log("Liftoff!");` go, and why?
○ Inside the loop, so it prints on every pass.
→ Not quite. That would print `Liftoff!` three times, once for each number.
◉ After the loop, so it prints once, when the countdown has finished.
→ Right. The announcement belongs after the loop, so it prints once.
○ Before the loop, so it prints first.
→ Not quite. That would announce the launch before the countdown starts.
```
