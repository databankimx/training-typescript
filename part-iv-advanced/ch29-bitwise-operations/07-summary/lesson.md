## Summary: Bitwise operations

Bitwise operators work on the bits of a number, one position at a time.

* **A pattern is a sum of place values.** Each position is worth double the one to its right.
* **`&`, `|`, and `^` combine two patterns position by position.** `~` flips every bit.
* **Flags use one bit each.** `|` sets, `& ~mask` clears, `^` toggles, and `&` tests.
* **Shifts multiply and divide by powers of two.** `>>` keeps the sign, and `>>>` does not.
* **Bitwise operators use 32-bit integers.** Values outside that range wrap around silently.
* **BigInt holds exact integers of any size.** Mixing it with ordinary numbers needs an explicit conversion.

### Check your understanding

*These questions are written for this course.*

```quiz
What does `flags |= WRITE` do to a flag set that already has `WRITE`?
○ Clears the write flag.
→ Not quite. Clearing uses `&` with an inverted mask.
◉ Leaves it set, because OR with a bit that is already one changes nothing.
→ Right. Setting a flag that is already set is harmless.
○ Toggles the write flag off.
→ Not quite. Toggling uses `^`.
```

```quiz
Why is `-20 >> 2` negative, and `-20 >>> 2` positive?
○ Because `>>>` is faster.
→ Not quite. Speed is not the difference.
◉ Because `>>` copies the sign bit into the empty places, and `>>>` fills them with zeros.
→ Right. Zeros turn the negative pattern into a large positive number.
○ Because the shift operators ignore negative numbers.
→ Not quite. Both operators handle negative numbers.
```

```quiz
A program must count bytes in a file that may be larger than 2 gigabytes. Which type should it use?
○ A bitwise OR with zero, so the count stays in 32 bits.
→ Not quite. Values past 2 gigabytes do not fit in 32 bits, so the count would wrap.
◉ BigInt, because it holds exact integers of any size.
→ Right. A type that keeps every digit avoids the 32-bit wrap.
○ An ordinary number, because it always holds exact integers.
→ Not quite. Ordinary numbers are exact only up to 2 to the power 53.
```
