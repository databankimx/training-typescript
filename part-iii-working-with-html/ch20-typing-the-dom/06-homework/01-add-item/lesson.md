# Homework: add item

A shopping list page has a field, an Add button, and an empty list. When the learner clicks Add, the typed text should become a new list item, and the field should be cleared for the next entry. The exercise combines typed selectors, an event handler, and safe text, in a single page.

> **Coming from JavaScript:** `createElement`, `append`, and the click event work the same way in both languages. The `HTMLUListElement` and `HTMLButtonElement` types are the TypeScript part.

## The task

The page is in `index.html`, and it loads `main.js`. Here is the starting code, which logs the field to the console:

```ts
const input = document.querySelector<HTMLInputElement>("#item");

console.log(input);
```

Start from the code above, in your own file. Find the field, the Add button, and the list, each with the correct type. When the button is clicked, create a list item, set its text to the field's value using `textContent`, add it to the list, and clear the field. Press **Run**, type an item, and click Add. Each click adds the typed text to the list.

## Hints

- `document.createElement("li")` makes a new list item. `list.append(entry)` adds it to the list.
- Use `textContent`, not `innerHTML`, for the item's text, as the previous step showed.

## When you're stuck

Show the solution. It's a spoiler, so give it a proper attempt in your own file first.

## Quiz

```quiz
Why is the list item's text set with `textContent` rather than `innerHTML`?
○ Because `li` elements cannot hold markup.
→ Not quite. They can, but the text here is typed by the learner.
◉ Because the text is typed by the learner, so it must be shown as characters, not markup.
→ Right. `textContent` keeps typed text from being read as HTML.
○ Because `textContent` makes the list faster.
→ Not quite. The reason is safety, not speed.
```
