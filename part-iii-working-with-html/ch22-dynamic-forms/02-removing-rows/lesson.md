# Removing rows

When every row has its own Remove button, it's tempting to attach a handler to each button. That works, but rows added later have no handler, so they can't be removed. The better approach is **event delegation**: one click handler on the whole list. A click on any button bubbles up to the list, and the handler finds which row the button belongs to.

> **Coming from JavaScript:** event bubbling and `closest` are the same in both languages. The `instanceof HTMLButtonElement` check and the generic `closest<HTMLLIElement>` are the TypeScript part.

## The program

The page has a list of two rows, each with a Remove button. The script is in `main.ts`:

```ts
const list = document.querySelector<HTMLUListElement>("#items");

if (list !== null) {
  list.addEventListener("click", (event: MouseEvent) => {
    const target = event.target;
    if (target instanceof HTMLButtonElement && target.classList.contains("remove")) {
      const row = target.closest<HTMLLIElement>("li");
      row?.remove();
    }
  });
}
```

Press **Run**, then press **Remove** beside Pencils. That row disappears, and Paper stays.

- **`event.target`** is the element that was actually clicked, which is the button. Its type is `EventTarget | null`, so the program checks that it is a button before using it.
- **`target.closest("li")`** walks up from the button to the nearest list item, which is the row to remove. The generic type says the result is a list item or `null`.
- **`row?.remove()`** removes the row, and does nothing if `closest` found no row.

## Why one handler is enough

The handler is attached to the list, which exists from the start, so it sees clicks on every row, including rows added after the page loads. A handler attached to each button would miss the new rows, so this is the pattern to use for any list that changes.

## Try it

- Add a third row, `<li>Pens <button class="remove" type="button">Remove</button></li>`, to the HTML, and check that its button also works.
- Change `target.closest<HTMLLIElement>("li")` to `target.closest("div")`, and press Remove. What happens, and why?
- Remove the `target instanceof HTMLButtonElement` check, and press **Check**. What does the checker report about `target.classList`?

## Quiz

```quiz
Why attach the click handler to the list rather than to each Remove button?
○ Because buttons cannot be clicked on their own.
→ Not quite. Buttons can be clicked. The issue is which rows the handler reaches.
◉ Because a handler on the list also works for rows added after the page loads.
→ Right. The list exists from the start, so clicks on every row, new or old, reach it.
○ Because the checker only allows one handler per page.
→ Not quite. The checker allows any number of handlers.
```

```quiz
Why is `target instanceof HTMLButtonElement` checked before calling `closest`?
○ Because `closest` only exists on buttons.
→ Not quite. `closest` exists on every element, but the click might have landed on something else.
◉ Because a click may land on the list itself or on text, so the target is not always a button.
→ Right. The check makes sure the target has the `classList` property the handler reads.
○ Because `instanceof` is needed to remove the row.
→ Not quite. Removing the row doesn't depend on that check. It makes sure the target is a button.
```
