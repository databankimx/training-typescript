# A honeypot field

A honeypot is a field that a person never sees and never fills in. Many bots fill every input they find in the HTML, so the honeypot catches them without troubling anyone else.

> **Coming from JavaScript:** the honeypot is ordinary markup and an ordinary `if`. The types on `honeypot` and `comment` are the TypeScript part, and they stop the handler from reading a field that isn't there.

## The trap in the HTML

```html
<div class="honeypot" aria-hidden="true">
  <label for="website">Leave this field empty</label>
  <input id="website" name="website" type="text" tabindex="-1" autocomplete="off">
</div>
```

CSS moves the field off-screen, `tabindex="-1"` keeps keyboard users off it, and `aria-hidden` keeps screen readers from announcing it. The field is kept off-screen rather than hidden with `display: none`, because some bots skip fields that are hidden that way.

## The check

The submit handler looks at the honeypot before it saves anything:

```typescript
if (honeypot.value !== "") {
  status.textContent = "Thanks for your comment.";
  comment.value = "";
  honeypot.value = "";
  return;
}
```

## Why the reply is the same

When the honeypot catches a submission, the page replies exactly as it does on success. An error message would tell the bot which field gave it away, and its author would simply remove that field. A neutral reply gives them nothing to act on.

## Try it

- Press Submit with some text and an empty honeypot. The comment should appear in the list.
- Press Simulate a bot. The reply reads the same, but the list does not change. Why?

## Quiz

```quiz
Why is the honeypot moved off-screen rather than hidden with `display: none`?
○ Because `display: none` is not allowed in forms.
→ Not quite. It is allowed. The question is whether a bot would skip the field.
◉ Because some bots skip fields that are hidden with `display: none`, so the trap would be missed.
→ Right. Off-screen keeps the field in the page for the bot while keeping it away from people.
○ Because off-screen fields are faster to submit.
→ Not quite. Speed is not the reason.
```

```quiz
Why does the rejected submission get the same reply as a successful one?
○ Because the checker requires one reply for every form.
→ Not quite. The checker has no such rule.
◉ Because an error message would tell the bot which field caught it, and it would simply remove that field.
→ Right. A neutral reply gives the bot nothing to adjust.
○ Because the comment was saved anyway.
→ Not quite. A rejected comment is not saved.
```
