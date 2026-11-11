# Escaping

Sometimes markup has to be built from a string, for example when a template is filled in from a file. The safe way to do that is to **escape** the learner's text first. Escaping replaces the five characters that give markup its meaning with entities: `&`, `<`, `>`, `"`, and `'`. An entity looks like the character, but the browser shows it as text, not as markup.

> **Coming from JavaScript:** `replaceAll` and the entity codes are the same in both languages. The `string` labels are the TypeScript part. The function is one of the few places where a string is deliberately built as markup, so it's worth reading carefully.

## The program

The page has a title field, pre-filled with `<b>bold</b> text`, and a preview paragraph. The script is in `main.ts`:

```ts
function escapeHtml(text: string): string {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

if (title !== null && preview !== null) {
  preview.innerHTML = `<strong>${escapeHtml(title.value)}</strong>`;
}
```

Press **Run**. The preview shows `<b>bold</b> text` in bold, as plain characters. The template puts the title inside `<strong>`, and the escaping stops the typed tags from becoming markup.

- **`&` comes first.** If the `&` were replaced after the others, the entities just made would be escaped again, and show as garbled text.
- **Each replacement** turns one character into an entity that the browser shows as that character.
- **The template** is markup written by the program, so `innerHTML` is safe for it. Only the learner's text is escaped.

## Escape where the text goes into markup

Escape at the point where the text is placed into markup, and nowhere else. Escaping a value and then storing it, and later placing it in a different context, can leave it wrong for that context. When you can, use `textContent` or build elements instead, and reserve escaping for template strings.

## Try it

- Change the title to `Tom & Jerry <3`, and run. What does the preview show?
- Remove the first `replaceAll("&", "&amp;")`, and type `&lt;b&gt;` into the field. What does the preview show?
- Replace `escapeHtml(title.value)` with `title.value`, and run with the default title. How does it differ?

## Quiz

```quiz
Why is `&` replaced first in `escapeHtml`?
○ Because `&` is the most common character.
→ Not quite. The order is about what the replacements produce.
◉ Because the entities the other replacements create contain `&`, which would then be escaped twice.
→ Right. Replacing `&` first means the `&` inside each entity is never escaped again.
○ Because `&` is not allowed in a template string.
→ Not quite. It is allowed, and the order is about escaping, not the template.
```

```quiz
In `preview.innerHTML = `<strong>${escapeHtml(title.value)}</strong>`;`, what is escaped?
○ The `<strong>` tags.
→ Not quite. Those are markup written by the program, and they must stay as tags.
◉ Only the learner's text, so the tags typed into it become characters.
→ Right. The program's own markup is trusted, and only the untrusted part is escaped.
○ Every character in the template.
→ Not quite. Escaping the template would break its own tags.
```
