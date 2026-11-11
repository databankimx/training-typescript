# Changing text safely

When a program shows text the learner typed, it must show it as plain text. `textContent` does that: the browser treats the value as characters, so a `<b>` in the input appears as the letters `<b>`. `innerHTML` reads the value as HTML, so the same input becomes markup. A learner who types markup could change the page, and in a shared page, that's the start of an attack. Cross-site scripting gets a full chapter later in the course. The habit starts here.

> **Coming from JavaScript:** `textContent`, `innerHTML`, and the `input` event are the same in both languages. The `HTMLDivElement` type is the TypeScript part.

## The program

The page has a text field and a preview line. The script is in `main.ts`:

```ts
const input = document.querySelector<HTMLInputElement>("#comment");
const preview = document.querySelector<HTMLDivElement>("#preview");

if (input !== null && preview !== null) {
  input.addEventListener("input", () => {
    preview.textContent = `Preview: ${input.value}`;
  });
}
```

Press **Run**, and type `hello` into the field. The preview updates with every key press, and shows `Preview: hello`.

- **The `input` event** fires whenever the field's text changes, including each key press. Unlike `click`, it has no need for a typed event object here, so the handler takes none.
- **`preview.textContent`** replaces the text of the preview with the value, as plain characters.
- **The template string** adds the text `Preview: ` in front of the typed value.

## Why not innerHTML

Try replacing `textContent` with `innerHTML`, and type `<b>bold</b>`. The preview shows the word **bold**, because the browser read the text as markup. With `textContent`, it shows `<b>bold</b>` exactly as typed. The safe default is `textContent`. Use `innerHTML` only for markup your program wrote itself, never for text a learner typed.

## Try it

- Type `<i>hello</i>` into the field, and check the preview. What does it show?
- Change `textContent` to `innerHTML`, and type `<i>hello</i>` again. What changes, and why?
- Change the preview to show the number of characters typed, using `input.value.length`. What does it show for `hello`?

## Quiz

```quiz
Why is `textContent` the safe choice for text a learner types?
○ Because it runs faster than `innerHTML`.
→ Not quite. The reason is what the browser does with the text, not speed.
◉ Because the browser shows the text as characters, so typed markup can't change the page.
→ Right. `textContent` never reads the value as HTML, so the learner cannot inject markup.
○ Because `innerHTML` is not allowed in scripts.
→ Not quite. `innerHTML` is allowed, but it reads text as markup, which is the risk.
```

```quiz
What does the `input` event tell the script?
○ That the page has finished loading.
→ Not quite. That's the load event, and it's different from typing.
◉ That the field's text has changed, including after each key press.
→ Right. The handler runs whenever the field's value changes.
○ That the learner has submitted the form.
→ Not quite. Submitting is a separate event, and the input event fires on each change.
```
