# Homework: shipping options

A checkout page offers two shipping options, and each option has a note under it saying when the order arrives. The note should match the option on screen when the page loads, and change whenever the learner picks the other option. The exercise reads the select's value, and updates the note from it.

> **Coming from JavaScript:** `change`, `value`, and the conditional expression are the same in both languages. The `HTMLSelectElement` and `HTMLParagraphElement` types are the TypeScript part.

## The task

The page is in `index.html`, and it loads `main.js`. Here is the starting code, which logs the select:

```ts
const shipping = document.querySelector<HTMLSelectElement>("#shipping");

console.log(shipping);
```

Start from the code above, in your own file. Find the select and the note paragraph, each with the correct type. Write a function that sets the note to `Express: arrives in 1 day` when the select's value is `express`, and to `Standard: arrives in 5 days` otherwise. Call it once when the page loads, so the note matches the starting choice, and again whenever the select changes. When the page opens, the note should read `Standard: arrives in 5 days`. Choose Express, and the note should change.

## Hints

- The select's `value` is the value of the chosen option, so `shipping.value` is `"standard"` or `"express"`.
- Call the function once at the start, as well as in the `change` handler, as the conditional fields step did.

## When you're stuck

Show the solution. It's a spoiler, so give it a proper attempt in your own file first.

## Quiz

```quiz
Why does the function need to run once when the page loads, as well as on change?
○ Because the `change` event fires when the page loads.
→ Not quite. The change event fires only when the learner picks a different option.
◉ Because the note must match the starting choice before the learner has changed anything.
→ Right. Without the first call, the note would show whatever the HTML says until the learner changes the choice.
○ Because the select cannot be read before it has changed.
→ Not quite. The select can be read at any time, and its value is available on load.
```
