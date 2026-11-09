# Homework: quantity check

A shop's order form takes a quantity, and an order needs at least one item. A quantity of zero, or an empty field, must not be sent. The exercise reads the quantity when the form is submitted, and shows either the order or an error message.

> **Coming from JavaScript:** `preventDefault`, `valueAsNumber`, and `Number.isNaN` are the same in both languages. The typed selectors and the `SubmitEvent` label are the TypeScript part.

## The task

The page is in `index.html`, and the form has `novalidate`, so the script decides. Here is the starting code, which logs the form:

```ts
const form = document.querySelector<HTMLFormElement>("#order");

console.log(form);
```

Start from the code above, in your own file. Find the form, the quantity field, and the result paragraph, each with the correct type. On submit, stop the browser sending the form. Read the quantity as a number. If it isn't a number, or it's less than `1`, show `Quantity must be at least 1`. Otherwise show `Ordering` followed by the quantity. The quantity starts at `0`, so pressing Order first should show the error.

## Hints

- `Number.isNaN` handles an empty field, and `count < 1` handles zero.
- Check for the error case first, and use `else` for the order.

## When you're stuck

Show the solution. It's a spoiler, so give it a proper attempt in your own file first.

## Quiz

```quiz
Why does the check need `Number.isNaN(count)` as well as `count < 1`?
○ Because `NaN` is less than `1`, so the second check catches it.
→ Not quite. A comparison with `NaN` is always `false`, so `count < 1` doesn't catch it.
◉ Because an empty field gives `NaN`, and `NaN < 1` is `false`, so it would otherwise pass as an order.
→ Right. The first check catches the empty field, which the second check can't.
○ Because `count` can never be zero.
→ Not quite. A quantity of zero is possible, and `count < 1` catches it.
```
