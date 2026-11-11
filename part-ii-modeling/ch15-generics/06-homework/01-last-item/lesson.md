# Homework: last item

A reporting tool shows the most recent reading from each sensor, and the readings arrive as a list. The same job applies to lists of numbers, names, and timestamps, so the function should be generic, not written once for each type. The exercise writes that function, and uses it on a list of scores.

> **Coming from JavaScript:** indexing and `length` work the same way in both languages. The `<T>` type parameter is the TypeScript part.

## The task

Here is the starting code, which prints the first score:

```ts
const scores: number[] = [4, 9, 2];

console.log(scores[0]);
```

Start from the code above, in your own file. Write a generic function `lastOf<T>` that takes a list of `T` and returns the last item, or `undefined` for an empty list. Print `lastOf(scores)`. The output should be:

```
2
```

## Hints

- The last position in a list is `items.length - 1`.
- The return type is `T | undefined`, because an empty list has no last item.

## When you're stuck

Show the solution. It's a spoiler, so give it a proper attempt in your own file first.

## Quiz

```quiz
Why make `lastOf` generic, rather than writing it for numbers only?
○ Because numbers can't be stored in lists.
→ Not quite. Numbers can be stored in lists. The reason is reuse.
◉ So the same function works for lists of any type, and the checker still tracks each type.
→ Right. One generic function serves every list, without repeating the logic.
○ Because generic functions run faster.
→ Not quite. The reason is reuse across types, not speed.
```
