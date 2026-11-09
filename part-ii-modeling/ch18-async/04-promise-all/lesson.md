# Waiting for several operations

Often several slow operations don't depend on each other: three prices can be fetched at once, and there's no reason to fetch them one after another. Starting them all and then waiting for every result is faster. `Promise.all` does that. It takes a list of promises, and gives back a single promise for a list of their results, in the same order.

> **Coming from JavaScript:** `Promise.all` is the same in both languages. The tuple label the checker infers for the result is the TypeScript part.

## The program

The program is already in `main.ts`:

```ts
function delay<T>(value: T, ms: number): Promise<T> {
  return new Promise<T>((resolve) => {
    setTimeout(() => resolve(value), ms);
  });
}

async function totals(): Promise<void> {
  const [mugs, plates] = await Promise.all([delay(3, 60), delay(5, 30)]);
  console.log(`Total items: ${mugs + plates}`);
}

void totals();
```

Press **Run**. You should see `Total items: 8`.

- **`delay`** is a generic helper from the generics chapter. It returns a promise of `value`, resolved after `ms` milliseconds.
- **`Promise.all([...])`** starts both delays at the same moment, and waits until the slower one, which takes 60 milliseconds, has finished.
- **`const [mugs, plates]`** takes the results apart by position, as in the destructuring step. `mugs` is `3`, and `plates` is `5`.

Because the two delays run together, the total time is about the slower one, not the two added together.

## What happens when one fails

If any promise in the list is rejected, `Promise.all` rejects straight away with that error. The other results are discarded. A `try` around the `await` catches it, as in the previous step.

## Try it

- Change `delay(5, 30)` to `delay(5, 200)`, and run. What changes in the total time?
- Make the second delay reject, by replacing it with `Promise.reject(new Error("no plates"))`, and wrap the `await` in `try` and `catch`. What is printed?
- Add a third delay, and destructure it as a third name. Check that the total still adds up.

## Quiz

```quiz
Why is `Promise.all` faster than awaiting each promise one after another?
○ Because the checker runs the promises in parallel.
→ Not quite. The checker doesn't run anything. The program starts the work itself.
◉ Because all the operations start together, so the total time is about the slowest one.
→ Right. Starting them together means their waits overlap instead of adding up.
○ Because `Promise.all` skips the waits.
→ Not quite. Each operation still takes its time. The gain is that they overlap.
```

```quiz
What does `await Promise.all([a, b])` give back, when `a` resolves to `3` and `b` to `5`?
○ `8`
→ Not quite. `Promise.all` gives back the two results, not their sum.
◉ `[3, 5]`
→ Right. The results come back as a list, in the same order as the promises.
○ `3`
→ Not quite. Only one result is returned if the list holds one promise.
```
