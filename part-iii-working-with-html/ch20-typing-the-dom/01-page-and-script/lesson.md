# A page and its script

A page is an HTML file that describes what the learner sees, and a script is code that changes it after the page loads. The page includes the script with a `script` element. This page's script is `main.js`, which the runner makes from `main.ts`, so the link in the HTML always points at the compiled code.

> **Coming from JavaScript:** the page, the `script` element, and `document.getElementById` are the same in both languages. The `HTMLElement | null` type is the TypeScript part.

## The page and the script

The page is `index.html`, and it contains an `h1` with the id `title`, and a script line:

```html
<h1 id="title">Hello</h1>
<script type="module" src="main.js"></script>
```

The script is `main.ts`:

```ts
const title = document.getElementById("title");

if (title !== null) {
  title.textContent = "Hello, world!";
}
```

Press **Run**. The page opens in its own window, and the heading shows `Hello, world!`.

- **`document`** is the page. Every element on it can be reached from there.
- **`getElementById("title")`** finds the element whose id is `title`. If no element has that id, it returns `null`.
- **`textContent`** is the text inside the element. Setting it replaces the text the learner sees.

## Why the null check is there

The checker can't know that the element exists, because the page might have been changed. `getElementById` is therefore typed as returning an element or `null`. The `if (title !== null)` check narrows the value, so the checker allows `title.textContent` inside the block. Without it, the line is refused.

## Try it

- Change `"Hello, world!"` to your own greeting, and press **Run** again. The window reloads with the new text.
- Change `"title"` in the script to `"heading"`, and run. What does the page show, and why?
- Remove the `if` check, and press **Check**. What does the checker report?

## Quiz

```quiz
Why does the page load `main.js`, when the file you edit is `main.ts`?
○ Because browsers can run TypeScript directly.
→ Not quite. Browsers run JavaScript. The runner makes the JavaScript from your TypeScript.
◉ Because the runner compiles `main.ts` to `main.js`, and the page loads the compiled file.
→ Right. The page always loads the compiled version of the code you have in the editor.
○ Because `main.js` is a separate program you must write yourself.
→ Not quite. The runner creates `main.js` for you, from `main.ts`.
```

```quiz
What does `getElementById` return when no element has the id?
○ An empty element.
→ Not quite. It returns `null`, which is why the check is needed.
◉ `null`.
→ Right. The checker types the result as an element or `null`, so the null check is required.
○ `undefined`, which the program ignores.
→ Not quite. The return value is typed as `null`, which the check must handle.
```
