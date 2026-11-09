# Reading a form

A form groups the fields a learner fills in, and a **submit** event fires when the learner presses the Submit button. Left alone, the browser sends the form somewhere and reloads the page. A script that handles the submit event calls `preventDefault` to stop that, and reads the values itself.

> **Coming from JavaScript:** `FormData`, `preventDefault`, and the submit event are the same in both languages. The `SubmitEvent` and `HTMLFormElement` types are the TypeScript part.

## The page and the program

The page has a form with a quantity field and a size list, and a paragraph for the summary. The script is in `main.ts`:

```ts
const form = document.querySelector<HTMLFormElement>("#order");
const summary = document.querySelector<HTMLParagraphElement>("#summary");

if (form !== null && summary !== null) {
  form.addEventListener("submit", (event: SubmitEvent) => {
    event.preventDefault();
    const data = new FormData(form);
    const quantity = data.get("quantity");
    const size = data.get("size");
    summary.textContent = `${quantity} x ${size}`;
  });
}
```

Press **Run**, then press **Submit**. The summary shows `2 x M`, and the page stays where it is.

- **`event.preventDefault()`** stops the browser sending the form and reloading the page. Without it, the summary would disappear straight away.
- **`new FormData(form)`** collects the values, using each field's `name` attribute as its key.
- **`data.get("quantity")`** returns the value for that name. Its type is `FormDataEntryValue | null`, because a name might be missing from the form.

## What the type says about the value

`get` doesn't return a number, even though the field is a number input. A form's values are text, or a file, so the checker types them that way. The next steps show how to turn a value into a number safely.

## Try it

- Change the size in the list to `L`, press Submit, and check the summary.
- Remove `event.preventDefault();`, and press Submit. What happens to the summary, and why?
- Change `data.get("size")` to `data.get("colour")`. What is shown, and what does the checker say about the type?

## Quiz

```quiz
Why does `event.preventDefault()` come first in the submit handler?
○ Because the form cannot be read after the browser sends it.
→ Not quite. The values can still be read, but the browser's default action would reload the page first.
◉ Because it stops the browser sending the form and reloading the page, so the script can handle it.
→ Right. The default action of a submit is to send the form, and `preventDefault` cancels that.
○ Because it sets the form's values to their defaults.
→ Not quite. It only cancels the default action, and doesn't change the values.
```

```quiz
What type does `data.get("quantity")` give, when the number input holds `2`?
○ `number`
→ Not quite. Form values come back as text, or a file, so the value is not typed as a number.
◉ `FormDataEntryValue | null`
→ Right. The value is text or a file, and it can be `null` when the name is missing.
○ `HTMLInputElement`
→ Not quite. `get` returns the value of the field, not the element.
```
