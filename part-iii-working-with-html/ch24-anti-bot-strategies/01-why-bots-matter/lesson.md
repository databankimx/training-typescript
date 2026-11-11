# Why bots matter

A comment form looks like a small thing until someone discovers it is the easiest place on the site to post advertising. The form is public, its fields are readable, and anyone can send the same values back thousands of times without opening a browser at all.

We are not going to stop bots in this chapter. We are going to learn what each defence actually accomplishes, and where it stops working.

> **Coming from JavaScript:** the submit handler is the same code in both languages. The types on `event`, `comment`, and the elements are the TypeScript part, and they are checked before the page ever runs.

## Try the form

The page has a submit handler, and a button that simulates a bot:

```typescript
botButton.addEventListener("click", () => {
  comment.value = "Cheap watches, click here";
  form.requestSubmit();
});
```

Press **Simulate a bot**, and the status line reads `Saved 1 comment(s).` The bot's comment went through the same handler a person's would.

## Why the browser cannot be the referee

The page runs on the visitor's computer, and the visitor controls that computer. Any check on the page is a request rather than an enforcement. A determined bot does not need the page at all: it can read the field names from the HTML and post plain requests to the server with any values it likes.

So the first rule of this chapter is this. **A client-side check protects against mistakes and casual misuse. It does not prove that a human sent the data.** The client-side checks are still worth having, because they give honest people quick feedback and filter out the cheapest traffic.

## Why `requestSubmit` and not `submit`

Older code often calls `form.submit()`, which sends the form without firing a `submit` event. A handler that calls `preventDefault()` never sees it. `requestSubmit()` fires the event first, so the handler runs. The page uses `requestSubmit()` so the bot takes exactly the path a person takes.

## Try it

- Submit an empty comment with the Submit button. What does the status line say?
- Change `requestSubmit()` to `submit()` in the bot handler, and press Simulate a bot. What happens, and why?

## Quiz

```quiz
Why can't a check written in the page prove that a human sent a form?
○ Because browsers do not run TypeScript.
→ Not quite. The page runs as JavaScript, and that is not the reason.
◉ Because the visitor controls the computer the page runs on, and a script can send the same data without the page at all.
→ Right. The page is a request to the visitor, not an enforcement on them.
○ Because forms cannot be submitted by code.
→ Not quite. Code can submit a form in several ways.
```

```quiz
What does `requestSubmit()` do that `submit()` does not?
○ It sends the form faster.
→ Not quite. The difference is what happens before the form is sent.
◉ It fires the `submit` event first, so a handler that calls `preventDefault()` runs.
→ Right. A handler sees the event before the browser sends anything.
○ It removes the form from the page.
→ Not quite. The form stays on the page either way.
```
