# Homework: status message

A dashboard shows a short status line for each request it makes. A successful response shows `OK`, and a failed one shows the status code, so an operator can see what went wrong. The exercise reads the response's `ok` flag and its status, and returns the line to show.

> **Coming from JavaScript:** `response.ok` and `response.status` work the same way in both languages. The `Response` and `string` labels are the TypeScript part.

## The task

Here is the starting code, which prints the status of a successful response:

```ts
const response: Response = new Response("", { status: 200 });

console.log(response.status);
```

Start from the code above, in your own file. Write a function `describe(response)` that returns `"OK"` when the response succeeded, and `"Failed: "` followed by the status code when it didn't. Print `describe` for a response with status `404`. The output should be:

```
Failed: 404
```

## Hints

- `response.ok` tells you whether the request succeeded.
- A template string can join the text `Failed:` and the status number.

## When you're stuck

Show the solution. It's a spoiler, so give it a proper attempt in your own file first.

## Quiz

```quiz
Why use `response.ok` rather than checking `response.status === 200`?
○ Because `status` can't be compared with a number.
→ Not quite. `status` is a number, and it can be compared.
◉ Because `ok` covers every success status, not only `200`.
→ Right. `ok` is `true` for the whole success range, so it's the right test for success.
○ Because `ok` is required by the checker.
→ Not quite. The checker doesn't require it. The reason is that success covers more than one status.
```
