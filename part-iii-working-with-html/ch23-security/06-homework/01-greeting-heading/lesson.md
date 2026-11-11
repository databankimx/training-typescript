# Homework: greeting heading

A welcome page shows a visitor's name inside a heading. Names are typed by the visitor, so a name such as `Tom & Jerry <3` must appear exactly as typed, with the ampersand and the angle bracket visible. The heading is built as markup, so the name has to be escaped first.

> **Coming from JavaScript:** `replaceAll` and the template string are the same in both languages. The `HTMLDivElement` type is the TypeScript part.

## The task

The page has a name field pre-filled with `Tom & Jerry <3`, and an empty container. Here is the starting code, which logs the field:

```ts
const name = document.querySelector<HTMLInputElement>("#name");

console.log(name);
```

Start from the code above, in your own file. Write an `escapeHtml` function that replaces `&`, `<`, `>`, `"`, and `'` with their entities, with `&` replaced first. Then find the field and the container, and set the container's `innerHTML` to an `<h2>` containing `Hello, ` followed by the escaped name. The output should be:

```
Hello, Tom & Jerry <3
```

## Hints

- Replace `&` first. The other entities contain `&`, so escaping it later would break them.
- Only the name is escaped. The `<h2>` tags are yours, so they are written as they are.

## When you're stuck

Show the solution. It's a spoiler, so give it a proper attempt in your own file first.

## Quiz

```quiz
What happens if `escapeHtml` is not used, and the field holds `<i>Ada</i>`?
○ The heading shows the tags as text.
→ Not quite. Without escaping, the tags are read as markup, not shown as text.
◉ The heading shows `Ada` in italics, because the tags are read as markup.
→ Right. The name's markup becomes part of the heading.
○ The heading is empty.
→ Not quite. The heading shows the name, with its markup taking effect.
```
