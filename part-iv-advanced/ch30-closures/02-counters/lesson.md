# Counters with private state

A closure can keep a variable that no other code can reach. In `makeCounter`, `count` is not returned and not exported. The only way to change it is to call the function that was returned, and each call to `makeCounter` gets a separate `count`.

> **Coming from JavaScript:** the pattern is the same in both languages. TypeScript gives the returned function the type `() => number`, so callers know it takes nothing and gives back a count.

## The program

```typescript
function makeCounter(): () => number {
  let count: number = 0;
  return (): number => {
    count++;
    return count;
  };
}

const next = makeCounter();
next();
next();
console.log(next());

const other = makeCounter();
console.log(other());
```

```text
3
1
```

`next` has been called three times, so its count is 3. `other` is a separate counter, created by a separate call, so its count starts at zero and is 1 after its first call.

## Why the variable stays private

`count` is a local of `makeCounter`, and nothing returns it. Code outside the function cannot write `next.count` or change the value directly. That protection is valuable: the count can change only in the way the closure allows.

## Try it yourself

- Call `other()` a few more times, then call `next()`. Are the two counts independent?
- Try to print `count` at the bottom of the file. What does the checker report?

## Quiz

```quiz
Why does `other()` print 1, not 4, after `next()` has been called three times?
○ Because the counts are added together and reset.
→ Not quite. The counts are never added together.
◉ Because `other` is created by a separate call to `makeCounter`, so it has its own `count`.
→ Right. Each call to a factory creates a new set of private variables.
○ Because `next` and `other` share the same count, which was reset.
→ Not quite. They do not share anything, because each has its own `count`.
```
