# Promises

A **promise** is an object that stands for a value that will arrive later. It's in one of three states: pending while the work runs, fulfilled with a value when it succeeds, or rejected with an error when it fails. The program doesn't wait at the point where the promise is created. It carries on, and it attaches the work to do once the value arrives.

> **Coming from JavaScript:** promises are the same in both languages. The `Promise<number>` label is the TypeScript part, and it tells the checker what the eventual value will be.

## The program

The program is already in `main.ts`:

```ts
const later: Promise<number> = new Promise<number>((resolve) => {
  setTimeout(() => resolve(42), 100);
});

later.then((value: number) => {
  console.log(`Got ${value}`);
});

console.log("waiting");
```

Press **Run**. You should see:

```
waiting
Got 42
```

The line `console.log("waiting")` runs first. The timer takes about a tenth of a second, so the promise is still pending when the program reaches the end of the file. When the value arrives, `then` runs the function it was given, and prints `Got 42`.

- **`new Promise<number>`** creates the promise. The function inside gets `resolve`, which is called with the value when it's ready.
- **`setTimeout`** stands in for slow work, such as a network request, and calls `resolve` after 100 milliseconds.
- **`later.then(...)`** says what to do with the value. It doesn't wait; it registers the work.

## The order is not the order written

The `then` function is written before `console.log("waiting")`, but it runs last. Asynchronous code runs in the order its work finishes, not the order it appears in the file. That's the first thing to get used to.

## Try it

- Change `100` to `1000`, and run. Does the order of the two lines change?
- Add `console.log("still going");` after the `then` block, and predict where it appears before running.
- Change `resolve(42)` to `resolve("forty-two")`, and press **Check**. What does the checker say, and why?

## Quiz

```quiz
Why is `waiting` printed before `Got 42`, in the program above?
○ Because `then` always runs first.
→ Not quite. `then` runs when the value arrives, which is after the program reaches the end of the file.
◉ Because the program carries on while the promise is pending, and `then` runs once the value arrives.
→ Right. A pending promise doesn't stop the rest of the program, so the next line runs first.
○ Because the timer is shorter than the program.
→ Not quite. The timer is longer than the program's remaining lines, which is why `waiting` comes first.
```

```quiz
What does a promise typed `Promise<number>` promise?
○ That the value is available right now.
→ Not quite. A promise may still be pending. The label is about the value it will give.
◉ That when it succeeds, its value will be a number.
→ Right. The label describes the value the promise will eventually produce.
○ That it will never fail.
→ Not quite. A promise can be rejected, which the next steps cover.
```
