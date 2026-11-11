# Async and await

Chaining `then` calls works, but it quickly becomes hard to follow when several slow steps depend on each other. `async` and `await` let you write the same work in the order you'd describe it in words. An `async` function always returns a promise. Inside it, `await` pauses that function until a promise settles, while the rest of the program carries on.

> **Coming from JavaScript:** `async` and `await` are the same in both languages. The `Promise<void>` label on the function is the TypeScript part, and it says the function returns a promise with no value.

## The program

The program is already in `main.ts`:

```ts
function fetchPrice(item: string): Promise<number> {
  return new Promise<number>((resolve) => {
    setTimeout(() => resolve(item === "mug" ? 12 : 5), 50);
  });
}

async function showPrice(): Promise<void> {
  const price: number = await fetchPrice("mug");
  console.log(`Mug costs ${price}`);
}

void showPrice();
console.log("requested");
```

Press **Run**. You should see:

```
requested
Mug costs 12
```

`showPrice` reads like a sequence: fetch the price, then print it. The `await` on the `fetchPrice` line pauses the function until the promise resolves, and then `price` holds the number, as if the value had been there all along.

The `void` in front of `showPrice()` says that the caller deliberately doesn't wait for the function to finish. The program prints `requested` straight away, because the call returns its promise at once.

## What await does and doesn't do

`await` pauses only the function it is written in. It does not freeze the program. While `showPrice` waits, the rest of the file runs, which is why `requested` appears first. Use `await` where the next step needs the result, and not elsewhere.

## Try it

- Change `fetchPrice("mug")` to `fetchPrice("plate")`, and run. What's printed?
- Remove the `void` in front of `showPrice()`, and press **Check**. What does the checker say, and why does it matter?
- Add a second `await fetchPrice("mug")` line inside `showPrice`, and check how long the output takes to appear.

## Quiz

```quiz
What does `await` pause in the program above?
○ The whole program until the price arrives.
→ Not quite. Only the function that contains the `await` pauses. The rest of the file runs.
◉ Only `showPrice`, until the promise from `fetchPrice` resolves.
→ Right. `await` pauses the function it is in, and the rest of the program carries on.
○ The timer inside `fetchPrice`.
→ Not quite. The timer runs on its own. `await` only waits in the function that uses it.
```

```quiz
What type does an `async` function always return?
○ The value written after `return`.
→ Not quite. The function returns a promise of that value, so the caller must await it.
◉ A promise.
→ Right. An `async` function always returns a promise, even when it returns no value.
○ `void`.
→ Not quite. A function labelled `void` returns no value at all. An `async` function returns a promise, which `void` is only a label for the promise's value.
```
