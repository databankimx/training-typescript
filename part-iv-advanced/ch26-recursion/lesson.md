# Ch26 - Recursion

A recursive function is one that calls itself. That sounds like a trick, but many problems are naturally self-similar: a folder contains folders, an expression contains expressions, and a list can contain lists. Recursion lets the function follow the shape of the data, without the program needing to know how deep the data goes.

It has one hazard. A function that calls itself without a stopping point runs until the program runs out of room for its calls. This chapter teaches the stopping point first, then shows recursion on numbers, on nested data, and on a problem where it is easy to do far too much work.

## What you'll learn

1. What a recursive call is, and how each call waits for the one it makes.
2. Why every recursive function needs a base case, and what happens without one.
3. How a recursive version of a calculation compares with a loop.
4. How a recursive type describes nested data, and how the checker supports it.
5. Why a naive recursive solution can repeat the same work many times.

The chapter ends with a summary, and a homework exercise.
