# Flags in one number

A flag is a yes-or-no setting, and one number can hold many of them, one per bit. The masks `READ`, `WRITE`, and `EXECUTE` each have one bit set. Combining masks with `|` sets several flags at once, and `&` tests a flag without changing anything else.

> **Coming from JavaScript:** the operators and the shift used for the masks are the same in both languages. The `number` labels on the masks are the TypeScript part, and they say the masks are plain numbers.

## The program

```typescript
const READ: number = 1 << 0;      // 001
const WRITE: number = 1 << 1;     // 010
const EXECUTE: number = 1 << 2;   // 100

let permissions: number = READ | WRITE;
console.log(permissions);

permissions |= EXECUTE;
console.log(permissions);

console.log((permissions & WRITE) !== 0);

permissions &= ~WRITE;
console.log(permissions);

permissions ^= READ;
console.log(permissions);
```

```text
3
7
true
5
4
```

Each line does one job:

- **`READ | WRITE`** sets two flags, giving `011`, which is 3.
- **`permissions |= EXECUTE`** sets a flag and leaves the others alone.
- **`(permissions & WRITE) !== 0`** tests a flag. The result is zero only when the bit is off, so the test compares with zero.
- **`permissions &= ~WRITE`** clears a flag. `~WRITE` is every bit except the write bit, and `&` keeps all the others.
- **`permissions ^= READ`** toggles a flag, turning it off if it was on, and on if it was off.

## Try it yourself

- Print `permissions & EXECUTE` after each step. Why does it show `0` at some points and `4` at others?
- Add a fourth flag, `DELETE`, as `1 << 3`. What number does it add when set?

## Quiz

```quiz
What does `permissions &= ~WRITE` do?
○ Sets the write flag.
→ Not quite. Setting uses `|`.
◉ Clears the write flag and leaves every other flag as it was.
→ Right. The mask of all bits except WRITE keeps the others and removes this one.
○ Toggles the write flag.
→ Not quite. Toggling uses `^`.
```
