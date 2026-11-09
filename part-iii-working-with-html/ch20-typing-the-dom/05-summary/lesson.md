## Summary: Typing the DOM

A page is a tree of elements, and the browser's types describe what each element can do. A script finds an element with the type it needs, reacts to events, and changes text as plain characters.

* **A page loads its script with a `script` element.** The runner compiles `main.ts` to `main.js`, and the page loads that.
* **Selectors return `null` when nothing matches.** Check for `null` before using the element.
* **A typed selector gives the element's type.** `querySelector<HTMLInputElement>` allows `value`, and the checker refuses it on other elements.
* **Event handlers receive typed events.** `addEventListener` and the event type say what the handler can use.
* **`textContent` is the safe default.** It shows typed text as characters, not as markup.

### Check your understanding

*These questions are written for this course.*

```quiz
Why does `document.getElementById("title")` need a null check before `textContent` is set?
○ Because `textContent` is read-only.
→ Not quite. `textContent` can be set. The issue is whether the element exists.
◉ Because no element may have that id, so the result can be `null`.
→ Right. The checker types the result as an element or `null`, so the check is required.
○ Because `getElementById` always returns a paragraph.
→ Not quite. It returns whatever element has the id, or `null`.
```

```quiz
Which choice keeps a learner's typed text from changing the page's markup?
○ `innerHTML`, because it accepts any text.
→ Not quite. `innerHTML` reads the text as markup, which is the risk.
◉ `textContent`, because the browser shows the text as characters.
→ Right. The typed text is never read as HTML.
○ `innerHTML`, provided the text is trimmed first.
→ Not quite. Trimming doesn't stop markup, so the text is still read as HTML.
```

```quiz
What does `querySelector<HTMLInputElement>("#comment")` let the checker allow?
○ Only `textContent`.
→ Not quite. The type allows the properties an input has, such as `value`.
◉ Input properties such as `value`, because the element is typed as an input.
→ Right. The type parameter describes the element the selector is expected to return.
○ Any property, because selectors are untyped.
→ Not quite. The type decides which properties are allowed.
```
