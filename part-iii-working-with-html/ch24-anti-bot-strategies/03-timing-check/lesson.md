# Timing checks

People are slow. They read the form, click into a field, and type before pressing Submit. A script can submit the same form in a few milliseconds, and that gap is useful. A submission that arrives too quickly is probably not from a person.

> **Coming from JavaScript:** `Date.now()` and `setTimeout` are the same in both languages. The `number` labels and the `Promise<void>` on `wait` are the TypeScript part.

## Measure from when the page opened

The script records the time once, when it starts, and compares it with each submission:

```typescript
const MIN_MILLISECONDS: number = 3000;
const openedAt: number = Date.now();

// inside the submit handler
const elapsed: number = Date.now() - openedAt;
if (elapsed < MIN_MILLISECONDS) {
  status.textContent = "Thanks for your comment.";
  comment.value = "";
  return;
}
```

```text
Thanks for your comment.
```

`Date.now()` returns milliseconds as a plain number, so the elapsed time is a subtraction. The label `const elapsed: number` is not required, but it documents the unit, which is a useful habit when a value is measured in something you might confuse.

## Why three seconds is only a guess

Too short, and a quick typist is rejected. Too long, and an impatient visitor gives up. Choose the number from how the real form is used, and expect to tune it.

The check also measures time since the page loaded, not time spent typing. A person who loads the page, leaves for ten minutes, and comes back passes it. A bot that waits three seconds passes it too. The check raises the cost of automation. It does not identify anyone.

## Try it

- Press Simulate a bot straight after the page loads. What is the reply, and is the comment saved?
- Press Simulate a slow person. Is the comment saved this time?
- Change `MIN_MILLISECONDS` to `500`, then to `10000`. Which value would you choose for a real form, and why?

## Quiz

```quiz
What does `const openedAt: number = Date.now();` record?
○ The time the user last typed a key.
→ Not quite. It records the time the script started running.
◉ The time, in milliseconds, when the page's script started.
→ Right. Later submissions are compared against this moment.
○ The number of comments submitted so far.
→ Not quite. It is a time, not a count.
```

```quiz
Why does the timing check reply neutrally, like the honeypot?
○ Because the timing check never runs in a browser.
→ Not quite. It runs in the browser, and the reply is the issue.
◉ So the bot's author cannot tell which rule caught the submission, and adjust for it.
→ Right. A neutral reply keeps the rule hidden from automation.
○ Because the reply is always the same for every visitor.
→ Not quite. The reply is neutral for the timing check, but it is not the same for every check.
```
