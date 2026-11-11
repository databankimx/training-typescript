# Homework: add with total

A shopping basket takes an item name and a price from a form. Each submitted item becomes a row, and the total at the bottom must always equal the sum of the prices in the rows. The exercise keeps the running total as a number, updates it on each submit, and clears the form for the next item.

> **Coming from JavaScript:** `preventDefault`, `append`, and `toFixed` are the same in both languages. The `number` label on the total and the `valueAsNumber` reading are the TypeScript part.

## The task

The form has `novalidate`, so the script decides what to accept. Here is the starting code, which logs the form:

```ts
const form = document.querySelector<HTMLFormElement>("#add-form");

console.log(form);
```

Start from the code above, in your own file. Find the form, the name field, the price field, the list, and the total paragraph, each with the correct type. Keep a running total in a variable that starts at zero. On submit, stop the browser sending the form. If the name is empty, or the price is not a number, do nothing. Otherwise add the price to the total, add a row showing the name and price, show the new total as `Total: <sum>`, and clear both fields.

Enter `Pens` with a price of `3`, and submit. The total should read:

```
Total: 3
```

## Hints

- `name.value.trim() === ""` catches a name that is only spaces.
- The total is a number, so it's shown with `${sum}`, which needs no formatting.

## When you're stuck

Show the solution. It's a spoiler, so give it a proper attempt in your own file first.

## Quiz

```quiz
Why keep the running total in a variable rather than adding up the rows' text on each submit?
○ Because text cannot be added.
→ Not quite. The reason is simpler and more direct, and text would need parsing first.
◉ Because the total is a number, and keeping it apart from the text avoids parsing the rows each time.
→ Right. The number is the source of the total, and the rows only show the items.
○ Because the total must be typed `any`.
→ Not quite. The total is a number, and the variable is typed as one.
```
