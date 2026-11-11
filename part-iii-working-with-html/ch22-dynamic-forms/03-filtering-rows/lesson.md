# Filtering rows

Filtering doesn't change the data. It shows the rows that match what the learner typed and hides the rest. The script reads the field on every `input` event, goes through each row, and toggles a `hidden` class. Because the rows stay in the page, clearing the field brings them all back.

> **Coming from JavaScript:** `querySelectorAll`, `classList.toggle`, and `includes` are the same in both languages. The `?? ""` for the row's text is the TypeScript part, and it's there for a reason the checker enforces.

## The program

The page has a filter field and a list of three rows. The script is in `main.ts`:

```ts
const filter = document.querySelector<HTMLInputElement>("#filter");
const list = document.querySelector<HTMLUListElement>("#items");

if (filter !== null && list !== null) {
  filter.addEventListener("input", () => {
    const text = filter.value.trim().toLowerCase();
    for (const item of Array.from(list.querySelectorAll<HTMLLIElement>("li"))) {
      const name = (item.textContent ?? "").toLowerCase();
      item.classList.toggle("hidden", !name.includes(text));
    }
  });
}
```

Press **Run**, and type `pe` into the filter. Pencils and Pens stay, and Paper is hidden. Clear the field, and all three return.

- **`item.textContent`** is `string | null`, because an element that isn't in the document has no text. The `?? ""` gives an empty string in that case, so `toLowerCase` is always called on text.
- **`classList.toggle("hidden", !matches)`** hides the row when it doesn't match, and shows it when it does.
- **`Array.from`** turns the list of rows into an array, so the `for...of` loop is simple to read.

## Why the rows stay in the page

Filtering hides rows rather than removing them. If the program removed rows that don't match, clearing the filter would have nothing to bring back. Keeping every row in the page, and changing only what is shown, means the data never needs to be rebuilt.

## Try it

- Change `includes(text)` to `startsWith(text)`, and type `pe` and then `pa`. What changes?
- Remove the `?? ""`, and press **Check**. What does the checker report about `item.textContent`?
- Add a sentence of text to the page that says how many rows match, and update it on each input.

## Quiz

```quiz
Why does filtering hide rows instead of removing them?
○ Because removed rows cannot be added back.
→ Not quite. Rows could be re-created, but that would throw away what was on the page.
◉ So clearing the filter can show every row again, without rebuilding the list.
→ Right. The rows are still in the page, so only their visibility changes.
○ Because `hidden` is faster than `remove`.
→ Not quite. The reason is that the rows stay available, not speed.
```

```quiz
Why is `?? ""` needed after `item.textContent`?
○ Because the text is always a number.
→ Not quite. It's text, but it can be missing, so the checker types it as `string | null`.
◉ Because `textContent` can be `null`, and `toLowerCase` can only run on text.
→ Right. The fallback makes sure the method is called only on a string.
○ Because the row has no text when it is hidden.
→ Not quite. Hiding a row doesn't remove its text. The fallback is for the type.
```
