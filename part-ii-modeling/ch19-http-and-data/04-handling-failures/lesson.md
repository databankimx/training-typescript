# Handling failed responses

A server can answer with a failure: a `404` for a missing order, a `500` when it breaks. The body of a failed response often isn't the data at all, but an error page. A program that reads the body without checking the status can treat that page as an order. The rule is simple: check `ok` first, and only read the body after it passes.

> **Coming from JavaScript:** checking `response.ok` and throwing the error are the same in both languages. The `Promise<string>` label and the `error: unknown` in the `catch` are the TypeScript part.

## The program

The program is already in `main.ts`:

```ts
async function readOrder(response: Response): Promise<string> {
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  const data: unknown = await response.json();
  return JSON.stringify(data);
}

async function main(): Promise<void> {
  try {
    console.log(await readOrder(new Response('{"id":7}', { status: 200 })));
    console.log(await readOrder(new Response("Not found", { status: 404 })));
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
}

void main();
```

Press **Run**. You should see:

```
{"id":7}
Request failed with status 404
```

The first response is a success, so its body is read and printed. The second has status `404`, so `readOrder` throws before it looks at the body at all. The `catch` block turns that into a message the reader can understand.

## Why check before reading

Reading the body of a failed response is wasted work at best, and at worst it gives the program something that looks like data but is an error page. Checking the status first means the body is read only when it's the data the request was for.

## Try it

- Change `404` to `200` in the second call, and run. What's printed for the second response, and why?
- Remove the `if (!response.ok)` check, and run. What does the second line print instead?
- Change the message to include the URL of the request, using a parameter. What does the function need to receive?

## Quiz

```quiz
Why is `response.ok` checked before `response.json()` is called?
○ Because `json()` can only be called once.
→ Not quite. The reason is what the body contains when the request failed.
◉ Because a failed response's body is often an error, not the data the request asked for.
→ Right. Checking first means the body is read only for successful responses.
○ Because `ok` is slower to check than reading the body.
→ Not quite. The check is fast. The reason is protecting the program from error bodies.
```

```quiz
What does the `throw` in `readOrder` do to the rest of the function?
◉ It skips the `json()` call and the `return`, and sends the error to the caller.
→ Right. A throw leaves the function immediately, so the body is never read.
○ It reads the body, and then throws.
→ Not quite. The throw happens before the body is read.
○ It returns the error message as the result.
→ Not quite. A throw sends an error, not a returned value.
```
