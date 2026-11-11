# Infinite sequences

A generator with a loop that never ends describes an infinite sequence, and that is harmless as long as the consumer stops asking. The `take` function reads values until it has enough, then leaves the loop. The generator is paused at its last `yield`, and it never runs again, so the rest of the sequence is never computed.

> **Coming from JavaScript:** the generator and `take` are the same in both languages. The `Iterable<number>` parameter type is the TypeScript part, and it lets `take` accept any iterable, not only a generator.

## The program

```typescript
function* naturals(): Generator<number> {
  let n: number = 1;
  while (true) {
    yield n;
    n++;
  }
}

function take(source: Iterable<number>, count: number): number[] {
  const result: number[] = [];
  if (count === 0) {
    return result;
  }
  for (const value of source) {
    result.push(value);
    if (result.length === count) {
      break;
    }
  }
  return result;
}

console.log(take(naturals(), 5).join(", "));
```

```text
1, 2, 3, 4, 5
```

`naturals` would run forever if it were read in full, but `take` stops after five values. The `break` exits the loop, which calls the generator's cleanup, and nothing else is computed.

The `count === 0` check comes first because the loop body adds a value before it checks the count, so a request for zero would otherwise return one value.

## Try it yourself

- Call `take(naturals(), 0)` and `take(naturals(), 1)`. What does each return?
- Write a generator that yields the even numbers, and pass it to `take` to get the first four.

## Quiz

```quiz
Why does `take(naturals(), 5)` finish, even though `naturals` never ends?
○ Because the generator returns after five values.
→ Not quite. The generator has no return; it only pauses at each yield.
◉ Because the loop breaks after five values, so the generator is never asked for another.
→ Right. The consumer decides how much of an infinite sequence to read.
○ Because infinite generators are limited to ten thousand steps.
→ Not quite. The limit comes from the consumer stopping, not from a fixed cap.
```
