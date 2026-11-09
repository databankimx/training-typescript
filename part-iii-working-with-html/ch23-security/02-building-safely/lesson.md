# Building with text

The safe way to add a learner's text to a page is to build the element in code, and set its text with `textContent`. The browser never reads the text as markup, so the list shows exactly what was typed, angle brackets and all. This is the pattern from the dynamic forms chapter, applied to text that might be hostile.

> **Coming from JavaScript:** `createElement`, `textContent`, and `append` are the same in both languages. The typed element variables are the TypeScript part.

## The program

The page has a name field, pre-filled with `Ada <i>Lovelace</i>`, an Add button, and an empty list. The script is in `main.ts`:

```ts
if (name !== null && add !== null && names !== null) {
  add.addEventListener("click", () => {
    const row = document.createElement("li");
    row.textContent = name.value;
    names.append(row);
  });
}
```

Press **Run**, then press **Add**. The list shows `Ada <i>Lovelace</i>` exactly as typed, with the tags visible as text.

- **`document.createElement("li")`** builds the element in code. Its contents are not yet parsed as markup.
- **`row.textContent = name.value`** sets the text. The browser shows each character, including the angle brackets.
- **`names.append(row)`** adds the finished element to the list.

## Build elements, not strings

A common unsafe pattern builds a string of HTML, such as `` `<li>${name}</li>` ``, and then sets it with `innerHTML`. That puts the learner's text into the markup. Building elements instead means the text never becomes markup, so there is nothing to escape. Use elements for anything the learner can type.

## Try it

- Change the field's value to `<b>Grace</b>`, press Add, and check the row.
- Change `row.textContent = name.value;` to `row.innerHTML = name.value;`, and press Add. What is shown now?
- Change the field to `<i>one</i>`, press Add twice, and check that both rows show the same plain text.

## Quiz

```quiz
Why does the list show `Ada <i>Lovelace</i>` as written, when the field contains markup?
○ Because the field strips the tags before the script reads it.
→ Not quite. The field keeps the text as typed. The safe choice is in how it is displayed.
◉ Because `textContent` shows the text as characters, so the browser never reads the tags.
→ Right. The text is placed in the element as plain characters.
○ Because the list refuses markup and removes it.
→ Not quite. The list shows everything, including the tags, as text.
```

```quiz
Why is building `` `<li>${name}</li>` `` with `innerHTML` unsafe, while `createElement` is safe?
○ Because `innerHTML` is slower.
→ Not quite. The difference is whether the text becomes markup.
◉ Because the string version puts the learner's text into the markup, and `createElement` keeps it as text.
→ Right. Building elements in code means the text is never parsed as markup.
○ Because `createElement` can only make lists.
→ Not quite. It can make any element, and that's not what makes it safe.
```
