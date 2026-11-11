# Homework: set and toggle flags

A device stores its status in one number, with one bit per flag: `READ` is 1, `WRITE` is 2, and `EXECUTE` is 4. The starter prints the status with no flags set. The exercise changes the flags in three steps, and the program prints the status after each one.

> **Coming from JavaScript:** the operators are the same in both languages. The `number` labels on the masks are the TypeScript part.

## The task

Start from the starter `main.ts`, which prints `0`. Then, in your own file:

1. Set `READ` and `EXECUTE` in one step, and print the status.
2. Toggle `WRITE`, and print the status.
3. Clear `READ`, and print the status.

The expected output is:

```text
5
7
6
```

## Hints

- `READ | EXECUTE` combines two masks into one value to set both at once.
- `^=` toggles, so `WRITE` is turned on here because it was off.
- `&= ~READ` clears only the read bit.

## Try it yourself

- Predict the status after each step on paper, then check the output.
- Toggle `WRITE` a second time. What is the status now?

## Quiz

```quiz
Why does `permissions &= ~READ` leave the other flags unchanged?
○ Because `~READ` clears every flag.
→ Not quite. It clears only the read bit.
◉ Because `~READ` has every bit set except the read bit, so `&` keeps all the other flags.
→ Right. Only the bit that is zero in the mask is cleared.
○ Because `&=` never changes a number.
→ Not quite. It changes the number, but only in the positions the mask allows.
```
