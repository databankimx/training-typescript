# Homework: missing value

A search over a list of readings returns the first reading above a limit, or nothing when no reading is above it. Under the course's strict settings, the checker won't let the program use the result until it has checked for the missing case. The exercise is about making that check, so the code is correct whether a match is found or not.

> **Coming from JavaScript:** `find` and the `!== undefined` check are the same in both languages. The strict null checks come from the checker's settings, which JavaScript doesn't have.

## The task

Here is the starting code, which prints the result of `find` directly:

```ts
const values: number[] = [1, 4, 6];
const found = values.find((item: number) => item > 5);

console.log(found.toFixed(0));
```

Press **Check** on the starting code. The checker reports that `found` may be `undefined`, because `find` returns `undefined` when nothing matches.

Start from the code above, in your own file. Check `found` before using it. When a value was found, print `Found` followed by the value. Otherwise print `Not found`. With this list, the output should be:

```
Found 6
```

## Hints

- `find` returns the first matching item, or `undefined`, so compare with `undefined`.
- Use an `if` and `else`, so each branch knows which case it's in.

## When you're stuck

Show the solution. It's a spoiler, so give it a proper attempt in your own file first.

## Quiz

```quiz
Why does the checker refuse `found.toFixed(0)` as written?
○ Because `toFixed` is not allowed on numbers.
→ Not quite. `toFixed` is allowed on numbers, but `found` might not be one.
◉ Because `find` may return `undefined`, and strict null checks require that case to be handled.
→ Right. The type of `found` includes `undefined`, so the checker wants it checked first.
○ Because `found` is declared with `const`.
→ Not quite. A `const` can hold a value that may be missing, and the checker still checks it.
```
