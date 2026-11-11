# Building requests

A request says what you want from a server: the **method**, which is the kind of action, the **address**, which is the URL, the **headers**, which are extra details about the request, and sometimes a **body**. `GET` asks for data, and `POST` sends data to be created or processed. `fetch` takes a request, sends it, and returns a promise of the response.

> **Coming from JavaScript:** `Request`, `fetch`, and the headers work the same way in both languages. The `Request` label is the TypeScript part, and it tells the checker what kind of object this is.

## The program

The program is already in `main.ts`:

```ts
const request: Request = new Request("https://example.com/orders", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ item: "mug", quantity: 2 }),
});

console.log(request.method);
console.log(request.url);
console.log(request.headers.get("Content-Type"));
```

Press **Run**. You should see:

```
POST
https://example.com/orders
application/json
```

- **`method: "POST"`** says the request sends data to the server.
- **`"https://example.com/orders"`** is the address. Its beginning, `https`, says the connection is encrypted.
- **`headers`** tells the server the body is JSON, with the `Content-Type` header.
- **`body`** holds the data, converted to text with `JSON.stringify`, which is the reverse of `JSON.parse`.

This program only builds the request and reads it back. To send it, a real program would pass it to `fetch(request)` and await the response. The lessons here stay offline, so that step is left out.

## Try it

- Change `"POST"` to `"GET"`, and run. Which part of the request changes?
- Read `request.headers.get("Accept")`. What does it show, and why?
- Write `const bad: Request = new Request("https://example.com", { method: 42 });`, and press **Check**. What does the checker report?

## Quiz

```quiz
What does `JSON.stringify({ item: "mug", quantity: 2 })` produce?
○ An object with the same properties.
→ Not quite. `JSON.stringify` makes text, not another object.
◉ Text in JSON form, which can be sent as the body of a request.
→ Right. The body must be text, so the data is converted with `JSON.stringify`.
○ The number `2`.
→ Not quite. The whole object is converted, not only its quantity.
```

```quiz
Which method asks a server for data without sending a body?
○ `POST`
→ Not quite. `POST` is used to send data.
◉ `GET`
→ Right. `GET` requests data, and normally has no body.
○ `JSON`
→ Not quite. `JSON` is a data format, not a method.
```
