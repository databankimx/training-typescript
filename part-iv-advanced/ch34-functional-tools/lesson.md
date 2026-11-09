# Ch34 - Functional tools

A large part of working with data is the same three moves: change every item, keep the items that pass a test, and combine the items into one result. Functional tools name those moves, so the code says what it does rather than how the loop is built. Functions can also be combined, so small pieces can be assembled into larger ones without repeating their bodies.

The approach works best when functions do not change the data they receive and return new values instead. The checker helps by holding each function to the types it declares.

## What you'll learn

1. How `map`, `filter`, and `reduce` express changing, keeping, and combining values.
2. How to compose two functions into one, with a typed result.
3. How to fix some arguments of a function in advance, to make a new, simpler function.

The chapter ends with a summary, and a homework exercise.
