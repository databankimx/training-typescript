# Fixed-size numbers

A `Uint8Array` stores one byte per slot. A byte is an unsigned number from 0 to 255, and the array keeps exactly one byte for each element. Assigning a value outside that range does not raise an error. The value is wrapped into the byte range, so `256` becomes `0` and `-1` becomes `255`.

> **Coming from JavaScript:** typed arrays are the same in both languages. The `Uint8Array` label tells the checker each element is a byte, which is the reason the array is compact.

## The program

```typescript
const bytes: Uint8Array = new Uint8Array(4);

bytes[0] = 255;
bytes[1] = 256;
bytes[2] = -1;

console.log(bytes.join(", "));
```

```text
255, 0, 255, 0
```

The fourth slot was never set, so it holds the starting value, 0. The two wrapped values show that the array is a fixed-size store: there is no room for a larger number, so the value is reduced to fit.

Wrapping is arithmetic on the number of values a byte can hold, so 256 is `256 mod 256`, which is 0, and -1 is 255 steps back from zero.

## Choosing the right size

Pick the typed array whose size matches the data: `Uint8Array` for bytes, `Uint16Array` for values up to 65535, and `Float64Array` for decimal numbers. Using a size that is too small for the data is the usual source of silently wrong values.

## Try it yourself

- Set `bytes[3]` to `128`, then to `300`. What does each slot hold afterwards?
- Create a `Uint16Array` of length 2, and store `70000` in it. What value does it hold?

## Quiz

```quiz
What does a `Uint8Array` slot hold after `bytes[1] = 256`?
○ `256`, because the array can store any number.
→ Not quite. A byte cannot hold 256, so the value is wrapped.
◉ `0`, because 256 wraps around the byte range.
→ Right. The value is reduced to fit the 256 possible bytes.
○ An error is thrown, and the slot is unchanged.
→ Not quite. The assignment does not fail. It wraps.
```
