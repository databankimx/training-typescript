# Homework: an accessible challenge

A challenge is only useful if everyone can use it. The page asks "What is 7 + 5?" with a hint under the field. Right now a screen reader user who tabs into the field hears the label but not the hint, and a wrong answer appears in a paragraph that nothing announces. This exercise fixes both problems without changing how the challenge works.

> **Coming from JavaScript:** `aria-describedby` and `aria-live` are plain HTML attributes. The typed `HTMLInputElement` and `HTMLParagraphElement` selectors are the TypeScript part.

## The task

The script is complete, and it already handles the answer. Your work is in the markup, in `index.html`:

1. Connect the answer field to the hint with `aria-describedby`, so a screen reader reads the hint when the field is focused.
2. Make the feedback paragraph a polite live region with `aria-live="polite"`, so a wrong answer is announced without moving focus.

The page does not need a TypeScript change for either, which is the point. Accessibility here is a markup job, and the script only sets the text.

Here is the connection, in the input:

```html
<input id="answer" type="text" inputmode="numeric" autocomplete="off"
       aria-describedby="hint">
```

Here is the live region, in the feedback paragraph:

```html
<p id="feedback" aria-live="polite"></p>
```

Press **Check** with a wrong answer. The message appears, and a screen reader announces it. The focus stays in the answer field.

## Hints

- `aria-describedby` takes the `id` of the element that describes the field, here `hint`.
- Do not move focus into the feedback paragraph. That announces the message, but it pulls the visitor away from the field they need to fix.

## Try it yourself

- Remove `aria-live="polite"`, and check a wrong answer with a screen reader if you have one. Is the message still read?
- Change `polite` to `assertive`. When would that be the wrong choice?

## Quiz

```quiz
Why is `aria-live="polite"` better than moving focus to the feedback paragraph?
○ Because focus cannot be moved to paragraphs.
→ Not quite. Focus can be moved to elements with a tabindex, but that is not the reason.
◉ Because the message is announced without moving the visitor away from the field they need to correct.
→ Right. The announcement happens and the focus stays where it is.
○ Because `polite` makes the message louder.
→ Not quite. The politeness is about waiting for a pause, not volume.
```
