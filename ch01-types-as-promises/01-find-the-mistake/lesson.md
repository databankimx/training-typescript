# Find the mistake before it runs

**Coming from JavaScript:** you need plain functions, arrays, and `reduce`. If you're new to JavaScript, Ch00 covers what you need first.

We're going to start with a function that adds up the prices in a cart. It's the sort of helper that gets written quickly and then reused for years.

```js
function cartTotal(prices) {
  return prices.reduce((sum, price) => sum + price, 0);
}

console.log(cartTotal([20, 5, 3]));
```

It prints `28`. Now suppose the prices came from a form, where everything arrives as text. Before you run anything, predict what this prints:

```js
console.log(cartTotal(["20", "5", "3"]));
```

If you guessed `28`, you're reading the code the way it was meant to be read. JavaScript doesn't read it that way. The first addition is `0 + "20"`, which gives `"020"`, because `+` joins text as soon as either side is text. The rest follow the same rule, and the result is `"02053"`. Nothing throws an error, and the output looks plausible enough that nobody checks it.

That's the failure this course is about. The code runs, and the mistake shows up later, somewhere else, as a number that's really a string.

TypeScript can catch it before the program runs. Here's the same function with a type on the parameter:

```ts
function cartTotal(prices: number[]): number {
  return prices.reduce((sum, price) => sum + price, 0);
}

cartTotal(["20", "5", "3"]);
```

Open `main.ts` in the runner and press **Check**. You should see three errors, one for each string, each along the lines of `Type 'string' is not assignable to type 'number'`. They point at the strings in the call, which is useful, because the mistake is in what we passed, not in the function. The exact wording changes between TypeScript versions, but the idea doesn't. Press `npx tsc -p tsconfig.json --noEmit` in the repository root if you'd rather run it from a terminal. `npm run check` looks only at the fixed solutions, so it passes.

Now press **Run** instead. The program runs, and prints `02053`. This is the surprise we want you to notice. Node runs TypeScript by removing the type annotations and running what's left, so it doesn't check the types. The check is a separate step. That's why the runner has both buttons, and why you should run the check before you trust a change.

**Try it:** change the last line of `main.ts` so it passes numbers, then press **Check** again. The error goes away, and the output becomes `28`.

**Lecture extension:** ask the group what would have caught this bug in their own code, and how long it would have taken to find it.
