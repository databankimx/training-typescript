# Ch29 - Bitwise operations

Every number in a computer is stored as a pattern of bits, a long row of zeros and ones. Most programs never look at those bits, because the arithmetic operators hide them. Some jobs need the bits directly: reading flags packed into one number, reading a colour value, checking a permission, or building a compact record. The bitwise operators work on those patterns, and this chapter shows how they behave.

Bitwise operators treat their operands as 32-bit integers. That limit matters, so the chapter shows where it applies, and it ends with BigInt for values that need more room.

## What you'll learn

1. How a number is written in binary, and how to read and write a pattern in code.
2. How the AND, OR, XOR, and NOT operators combine two patterns, bit by bit.
3. How flags pack several yes-or-no settings into one number, and how to set, clear, and toggle them.
4. How shifts move bits left and right, and what overflow does to a 32-bit result.
5. How BigInt handles integers larger than the operators' limit.

The chapter ends with a summary, and a homework exercise.
