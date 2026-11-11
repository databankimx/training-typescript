# Events

An event is something the learner does: a click, a key press, a change to a field. `addEventListener` registers a function to run when an event happens. The function is a **handler**, and the browser passes it an event object. The type of that object depends on the event. A click gives a `MouseEvent`, and the checker knows that type, so the handler can use what a click has.

> **Coming from JavaScript:** `addEventListener` and the event objects are the same in both languages. The `(event: MouseEvent)` label is the TypeScript part.

## The program

The page has a button and a paragraph that starts as `Clicks: 0`. The script is in `main.ts`:

```ts
const button = document.querySelector<HTMLButtonElement>("#count");
const total = document.querySelector<HTMLParagraphElement>("#total");

let clicks: number = 0;

if (button !== null && total !== null) {
  button.addEventListener("click", (event: MouseEvent) => {
    clicks = clicks + 1;
    total.textContent = `Clicks: ${clicks}`;
  });
}
```

Press **Run**, then click the button three times. The paragraph shows `Clicks: 3`.

- **`let clicks`** holds the count. It lives in the script, and the handler can change it, because the handler is written inside the same scope.
- **The handler** adds one to `clicks`, and writes the new count into the paragraph. Every click runs it again.
- **The `if`** checks the elements exist before the handler is attached. Inside the handler, `total` is still known to be a paragraph, because it's a `const` that the check has narrowed.

## What the event tells you

The `event` parameter describes the click: where it happened, which key was held, and more. This program doesn't need those details, so the parameter goes unused. The label `MouseEvent` still matters. It tells the checker which events the handler is written for, so passing it to a key press would be refused.

## Try it

- Change the handler's last line to `total.textContent = event.type;`, and click the button. What does the paragraph show, and why?
- Change `"click"` to `"dblclick"`, and click once, then twice. What do you see?
- Change `(event: MouseEvent)` to `(event: KeyboardEvent)`, and press **Check**. What does the checker report about the `"click"` event?

## Quiz

```quiz
What does `(event: MouseEvent)` tell the checker?
○ That the handler will run only once.
→ Not quite. The label is about the event object's type, not how often the handler runs.
◉ That the handler receives an event with the properties a mouse click has.
→ Right. The type lists what the event provides, and the checker holds the handler to it.
○ That the button must be a `MouseEvent`.
→ Not quite. The label describes the event passed to the handler, not the button.
```

```quiz
Why does the handler change `clicks` rather than creating a new variable each time?
○ Because `let` variables cannot be created inside a function.
→ Not quite. They can be, but a new variable would not keep the count.
◉ Because the count must persist between clicks, so one variable is shared by every call.
→ Right. The variable lives in the script, so each click adds to the same count.
○ Because the checker only allows one variable.
→ Not quite. The checker allows as many variables as the program needs.
```
