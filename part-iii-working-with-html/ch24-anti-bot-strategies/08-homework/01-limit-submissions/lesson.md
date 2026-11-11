# Homework: limit submissions

A comment form is being flooded, and the team has agreed a simple rule: no more than two accepted comments in any thirty seconds from the same visitor. A visitor over the limit sees a neutral message, and their comment is not saved.

> **Coming from JavaScript:** the timestamps and the filter are the same code in both languages. The `number[]` label on the list is the TypeScript part, and it stops a timestamp from being confused with a comment.

## The task

Start from the starter `main.ts`, which saves every comment. Add the limit:

1. Keep a list of the times of the accepted submissions, typed as `number[]`.
2. On each submit, drop the times older than thirty seconds.
3. If two or more times remain, do not save the comment. Show `Please wait a while before sending another comment.`
4. Otherwise save the comment, record the time, and show the usual thanks message.

Submit three comments within thirty seconds. The third must not be saved.

The starter submit handler is where the new code goes:

```typescript
form.addEventListener("submit", (event: SubmitEvent) => {
  event.preventDefault();
  // ...check the text, add the limit here, then save
});
```

The third submission should show:

```text
Please wait a while before sending another comment.
```

## Hints

- `Date.now()` gives milliseconds, so thirty seconds is `30000`.
- Filter the list rather than removing items inside a loop.
- Use `>=` against the limit. With `>`, a third comment would slip through.

## Try it yourself

- Wait more than thirty seconds between submissions. Does the limit reset as you expect?
- Change the limit to three. Which submission is now refused first?

## Quiz

```quiz
Why does the comparison use `>=` against the limit of two?
○ Because the limit is exclusive, so the third comment should be allowed.
→ Not quite. The rule says at most two, so the third is over the limit.
◉ Because two recorded times mean two accepted comments, and a third must be refused.
→ Right. The comparison is made before the new time is recorded.
○ Because `>=` is faster than `>`.
→ Not quite. Speed is not the reason.
```
