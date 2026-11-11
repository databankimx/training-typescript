# Markup injection

`innerHTML` takes a string and reads it as HTML. If that string came from a learner, a file, or a web request, its author decides what the page does. Text that looks harmless can contain tags that change the page, and the page cannot tell the difference between its own markup and what was typed into it.

> **Coming from JavaScript:** `innerHTML` and `textContent` behave the same way in both languages. The `HTMLSpanElement` type is the TypeScript part, and the checker does not know whether a string came from a trusted source.

## The program

The page has a field with `<b>bold</b> text` in it, and two spans. The script is in `main.ts`:

```ts
const input = document.querySelector<HTMLInputElement>("#input");
const unsafe = document.querySelector<HTMLSpanElement>("#unsafe");
const safe = document.querySelector<HTMLSpanElement>("#safe");

if (input !== null && unsafe !== null && safe !== null) {
  const text: string = input.value;
  unsafe.innerHTML = text;
  safe.textContent = text;
}
```

Press **Run**. The first line shows **bold** in bold type, because `innerHTML` read the `<b>` tags as markup. The second line shows `<b>bold</b> text` exactly as typed, because `textContent` treats the value as characters.

- **`innerHTML = text`** reads the string as markup. Any tag in it becomes part of the page.
- **`textContent = text`** shows the string as characters. A tag in it is shown as the letters of the tag.

## Why this matters

A learner can type markup into a comment, a name, or a search field. If that field is shown with `innerHTML`, the markup takes effect for every other person who views the page. Markup can add a fake login form, hide real content, or load a script, and the learner who wrote it never needs to be on the same computer. The fix is almost always to use `textContent`.

## Try it

- Change the field's value to `<i>italic</i> words`, and run. How does each span show it?
- Change the field's value to `<a href="https://example.com">link</a>`. Which span shows a link?
- Change `unsafe.innerHTML = text;` to `unsafe.textContent = text;`. What does the first line show now?

## Quiz

```quiz
Why does the first span show **bold**, while the second span shows the tags as text?
○ Because the first span is larger.
→ Not quite. The difference is how each property reads the string.
◉ Because `innerHTML` reads the string as markup, and `textContent` shows it as characters.
→ Right. Only `innerHTML` turns the tags into page structure.
○ Because the field's value is different for each span.
→ Not quite. Both spans read the same field, so the text is identical.
```

```quiz
Why is `innerHTML` dangerous when the text comes from a learner?
○ Because it makes the page load more slowly.
→ Not quite. The danger is what the markup can do, not speed.
◉ Because the learner's markup changes the page for every person who views it.
→ Right. Anything typed into the text can become part of the page's structure.
○ Because `innerHTML` cannot display bold text.
→ Not quite. It can, and that is exactly the problem.
```
