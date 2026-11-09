# Typed selectors

`querySelector` finds the first element that matches a CSS selector, such as `#name` for the element with that id. Its generic type parameter tells the checker what kind of element you expect. With `HTMLInputElement`, the checker allows `value`, which only inputs have. With `HTMLParagraphElement`, it allows `textContent` on a paragraph. The type says which properties exist, so the checker catches a mistake such as reading `value` from a paragraph.

> **Coming from JavaScript:** `querySelector` is the same in both languages. The `<HTMLInputElement>` type parameter is the TypeScript part, and Node has no page to run it on.

## The program

The page has a text input with the id `name`, and an empty paragraph with the id `output`. The script is in `main.ts`:

```ts
const input = document.querySelector<HTMLInputElement>("#name");
const output = document.querySelector<HTMLParagraphElement>("#output");

if (input !== null && output !== null) {
  output.textContent = `Hello, ${input.value || "stranger"}!`;
}
```

Press **Run**. With the input empty, the paragraph shows `Hello, stranger!`. The script runs once, when the page loads, so typing into the input doesn't change the greeting yet. Step 4 makes the page react as the learner types. The `||` picks `"stranger"` when the input is empty, because an empty string is falsy.

- **`<HTMLInputElement>`** says the element is an input, so `input.value` is allowed.
- **`<HTMLParagraphElement>`** says the element is a paragraph, so `output.textContent` is allowed.
- **The `if`** checks both elements exist before using them. Each selector can return `null`.

## Choosing the right type

Pick the type that matches the element, not a general one. A general `HTMLElement` doesn't have `value`, so reading it would be refused. If you're not sure which type applies, hover over the selector in your editor, or look up the element in the HTML.

## Try it

- Change `#name` to `#missing`, and run. What does the greeting show, and why?
- Change `<HTMLInputElement>` to `<HTMLParagraphElement>` on the first line, and press **Check**. What does the checker report about `input.value`?
- Add a second input to the page, and read its value into a second paragraph. Remember that the script runs once, when the page loads.

## Quiz

```quiz
Why does `querySelector<HTMLInputElement>` make `input.value` allowed?
○ Because every element has a `value`.
→ Not quite. Only some elements have a `value`, and the type says which.
◉ Because the type parameter tells the checker the element is an input, which has a `value`.
→ Right. The type describes the element, so the checker knows which properties it has.
○ Because `value` is a function that runs on any element.
→ Not quite. `value` is a property, and the type decides whether it's allowed.
```

```quiz
What does `input.value || "stranger"` give when the input is empty?
○ An empty string.
→ Not quite. An empty string is falsy, so `||` moves on to its fallback.
◉ `"stranger"`.
→ Right. `||` takes the fallback whenever the left side is falsy, including an empty string.
○ `undefined`.
→ Not quite. The input's value is text, so the fallback is used rather than `undefined`.
```
