# Homework: toggle message

A lesson page hides a short message until the learner asks to see it. A button shows the message when it's hidden, and hides it again when it's shown. The page hides the message with a CSS class, and the script adds or removes that class on each click.

> **Coming from JavaScript:** `classList.toggle` and the `hidden` class work the same way in both languages. The typed selectors are the TypeScript part.

## The task

The page is in `index.html`, and its style hides any element with the class `hidden`. Here is the starting code, which logs the button:

```ts
const toggle = document.querySelector<HTMLButtonElement>("#toggle");

console.log(toggle);
```

Start from the code above, in your own file. Find the button and the message paragraph, each with the correct type. On each click of the button, add the class `hidden` to the message if it isn't there, and remove it if it is. Press **Run**, and click the button. The message appears and disappears with each click.

## Hints

- `classList.toggle("hidden")` adds the class when it's missing and removes it when it's there.
- The message starts with the `hidden` class, so the first click shows it.

## When you're stuck

Show the solution. It's a spoiler, so give it a proper attempt in your own file first.

## Quiz

```quiz
What does `classList.toggle("hidden")` do when the message already has the class?
○ It adds the class again.
→ Not quite. A class is only listed once, so adding it again changes nothing.
◉ It removes the class, so the message is shown.
→ Right. `toggle` removes a class that's present and adds one that's missing.
○ It deletes the paragraph from the page.
→ Not quite. `toggle` changes the class, and the paragraph stays on the page.
```
