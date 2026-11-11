# Iterable objects

An object joins the iteration protocol by providing a method under the key `Symbol.iterator`. The method returns an iterator, an object with a `next` method. Each call to `next` returns `{ value, done }`. When `done` is `true`, the loop stops. A `for...of` loop calls these methods for you.

> **Coming from JavaScript:** the protocol is the same in both languages. The `Iterator<number>` and `IteratorResult<number>` types are the TypeScript part, and they check that every result carries a number when `done` is false.

## The program

```typescript
const range = {
  from: 1,
  to: 3,
  [Symbol.iterator](): Iterator<number> {
    let current: number = this.from;
    const last: number = this.to;
    return {
      next: (): IteratorResult<number> => {
        if (current <= last) {
          const value: number = current;
          current++;
          return { value, done: false };
        }
        return { value: undefined, done: true };
      },
    };
  },
};

for (const n of range) {
  console.log(n);
}
```

```text
1
2
3
```

Each pass through the loop calls `next` once. The iterator keeps `current` in a closure, so it remembers where it is between calls. When `current` passes `last`, `next` returns `done: true`, and the loop ends.

## Why use the protocol

Once an object is iterable, every tool that takes iterables can read it: the loop, spread, `Array.from`, and the methods built on them. The object does not need to build an array first, so a large or endless sequence costs no more memory than one value at a time.

## Try it yourself

- Change `to` to `5`, and run. How many lines are printed?
- Remove the `current++` line, and run it with a timeout in mind. What happens, and why?

## Quiz

```quiz
What does `for (const n of range)` call on `range`?
○ It calls `range.next` directly.
→ Not quite. The loop calls `[Symbol.iterator]` first, and then `next` on the iterator it returns.
◉ It calls `[Symbol.iterator]` to get an iterator, then calls that iterator's `next` until `done` is true.
→ Right. The loop uses the protocol on the iterator the method returns.
○ It copies every value into an array before the loop starts.
→ Not quite. The values are produced one at a time, as the loop asks for them.
```
