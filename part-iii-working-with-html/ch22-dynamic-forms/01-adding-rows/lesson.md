# Adding rows

A page can create elements while it runs. `document.createElement` makes a new element, and the script sets its text and adds it to the page with `append`. Nothing appears until the script adds it, so the list starts empty, and each press of the button adds one more row.

> **Coming from JavaScript:** `createElement`, `textContent`, and `append` are the same in both languages. The `HTMLUListElement` and `HTMLButtonElement` types are the TypeScript part.

## The program

The page has a button and an empty list. The script is in `main.ts`:

```ts
const add = document.querySelector<HTMLButtonElement>("#add");
const list = document.querySelector<HTMLUListElement>("#items");

let count: number = 0;

if (add !== null && list !== null) {
  add.addEventListener("click", () => {
    count = count + 1;
    const item = document.createElement("li");
    item.textContent = `Item ${count}`;
    list.append(item);
  });
}
```

Press **Run**, then press **Add a row**. The first row reads `Item 1`. Press it again, and a second row, `Item 2`, appears below it.

- **`document.createElement("li")`** makes a new list item in memory. It isn't on the page yet.
- **`item.textContent`** sets its text. The text is typed by the program, so `textContent` is the right choice.
- **`list.append(item)`** adds the item to the end of the list, and the browser shows it straight away.

## The count lives outside the handler

`count` is declared before the handler, so each click adds one to the same number. If it were declared inside the handler, every row would be numbered `1`.

## Try it

- Change the text to `Row ${count}`, and check the rows.
- Use `list.prepend(item)` in place of `list.append(item)`. Where does each new row appear?
- Move `let count` inside the handler, press Add twice, and check the second row's text.

## Quiz

```quiz
Why does a new row not appear until `list.append(item)` runs?
○ Because `createElement` only makes a row once the page reloads.
→ Not quite. The page doesn't reload. The element exists in memory until it's added.
◉ Because `createElement` makes the element without placing it on the page.
→ Right. The element must be added to the page with `append` before the learner can see it.
○ Because `textContent` has to be set first, and it is set after the row is shown.
→ Not quite. The row is added after its text is set, so the learner sees the text too.
```

```quiz
What does the `count` variable do in this program?
○ It counts the number of times the page has loaded.
→ Not quite. It only changes inside the click handler.
◉ It keeps one running total across every click, so each row gets the next number.
→ Right. The variable is shared by all calls to the handler, so it keeps growing.
○ It counts the rows on the page, and removes old ones.
→ Not quite. It only counts how many times Add was pressed, and removes nothing.
```
