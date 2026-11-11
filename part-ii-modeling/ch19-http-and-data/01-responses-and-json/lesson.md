# Responses and JSON

A response has three parts you'll use most: a **status** number, which says how the request went, an `ok` flag that is `true` for the success statuses, and a **body**. The body is the data itself, and when the response is JSON, `json()` reads it into a value. That value carries no type of its own, so the checker can't know its shape.

> **Coming from JavaScript:** `Response`, `status`, `ok`, and `json()` are the same in both languages. The `Response` and `unknown` labels are the TypeScript part.

## The program

The program is already in `main.ts`:

```ts
const response: Response = new Response('{"name":"Ada","age":36}', {
  status: 200,
  headers: { "Content-Type": "application/json" },
});

console.log(response.status);
console.log(response.ok);

const data: unknown = await response.json();
console.log(data);
```

Press **Run**. You should see:

```
200
true
{ name: 'Ada', age: 36 }
```

- **`new Response(...)`** builds a response in memory, with a body and a status. In a real program, a network call returns one of these.
- **`response.status`** is `200`, the standard code for success. `response.ok` is `true` for any status from 200 to 299.
- **`await response.json()`** reads the body as JSON. The result is typed `unknown`, because the program didn't write the data, and the checker can't know its shape.

## Why unknown, and not a shape you chose

The server decides what it sends. A field might be missing, or hold the wrong type, and the program can't rely on it until it checks. Labelling the data `unknown` keeps that honest. The next step shows how to check it, and only then use it as a typed value.

## Try it

- Change the status to `404`, and run. What do `ok` and the rest of the output show?
- Change the body to `'{"name":"Ada"'`, which is not complete JSON, and run. What error appears?
- Write `console.log(data.name);`, and press **Check**. What does the checker report?

## Quiz

```quiz
What does `response.ok` tell you?
○ That the body has been read.
→ Not quite. Reading the body is separate, and `ok` says only about the status.
◉ Whether the status is in the success range, from 200 to 299.
→ Right. `ok` is `true` for the success statuses, so it's the quick way to check the outcome.
○ That the body is valid JSON.
→ Not quite. A response can succeed with an invalid body, so `ok` doesn't check the body.
```

```quiz
Why does `response.json()` give back `unknown` rather than a specific type?
○ Because `unknown` is faster to read.
→ Not quite. The reason is that the program doesn't control the data's shape.
◉ Because the server decides the data's shape, so the program must check it before relying on it.
→ Right. An unchecked value from outside should not be trusted, so the checker won't let it be used as a shape.
○ Because the checker cannot read JSON.
→ Not quite. The checker can read JSON. The issue is that the shape isn't known in advance.
```
