# Ch30 - Closures

A function remembers the variables that were in scope where it was written, even after the function that created them has returned. That remembered environment is a **closure**. It sounds like a niche feature, but it is how callbacks keep their state, how a value can be private to a function, and how an expensive result can be remembered for next time.

The types make closures easier to read. A function that returns a function has a type that says what the returned function accepts and gives back, and the checker holds each use to it.

## What you'll learn

1. How a returned function keeps the variables it was created with.
2. How each call to a factory function creates its own separate state.
3. How a closure hides a variable from everything except the functions that share it.
4. How memoization uses a closure to remember results, and how to measure what it saves.

The chapter ends with a summary, and a homework exercise.
