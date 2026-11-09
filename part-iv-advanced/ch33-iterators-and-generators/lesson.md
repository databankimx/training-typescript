# Ch33 - Iterators and generators

A `for...of` loop works on anything that knows how to hand out its values one at a time. Arrays, strings, maps, and sets all do, and so can your own objects. The rule behind this is the **iteration protocol**: an object that can produce an iterator, and an iterator that returns one value at a time until it is finished.

A **generator** is a function that produces such an iterator with almost no effort. It pauses at each `yield`, and it resumes when the next value is asked for. That makes it possible to describe a sequence that never ends, and to read only as much of it as the program needs.

## What you'll learn

1. How an object becomes iterable by providing an iterator, and how `for...of` uses it.
2. How a generator function pauses at `yield` and resumes on the next request.
3. How to read part of an infinite sequence, without computing the rest.

The chapter ends with a summary, and a homework exercise.
