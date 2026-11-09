# Generator functions

A generator is written like a function with a star after the keyword, and it uses `yield` to hand out a value. Calling a generator does not run its body. It returns a generator object, and the body runs only as far as the next `yield` each time a value is requested.

> **Coming from JavaScript:** generators are the same in both languages. The `Generator<number>` label is the TypeScript part, and it says the generator produces numbers.

## The program

```typescript
function* countUp(limit: number): Generator<number> {
  for (let i: number = 1; i <= limit; i++) {
    console.log(`about to yield ${i}`);
    yield i;
  }
}

for (const n of countUp(3)) {
  console.log(`got ${n}`);
}
```

```text
about to yield 1
got 1
about to yield 2
got 2
about to yield 3
got 3
```

Each line of `about to yield` runs inside the generator, and each `got` line runs in the loop. The two alternate, because the generator stops at `yield` until the loop asks for the next value. The generator's variable `i` survives those pauses, so the count continues where it left off.

## Why pausing matters

A generator computes a value only when it is needed. A loop that stops early never runs the rest of the body, so a long or expensive sequence costs only what is used.

## Try it yourself

- Add `break` after `console.log(\`got ${n}\`);` when `n` is 2. Which lines appear?
- Spread the generator into an array, `[...countUp(3)]`. Does the order of the output change?

## Quiz

```quiz
Why do the `about to yield` and `got` lines alternate?
○ Because the console prints in that order by default.
→ Not quite. The alternation comes from the pauses at each yield.
◉ Because the generator pauses at each yield, and the loop runs its body before asking for the next value.
→ Right. Control passes back and forth at every yield.
○ Because `countUp` runs twice.
→ Not quite. It runs once, pausing and resuming.
```
