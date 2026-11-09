## Summary: HTTP and data

Data from another program is untrusted until it's checked. These steps cover the path from a request to a value the program can use.

* **A request says what to ask for.** Its method, address, headers, and body describe the action.
* **A response carries a status and a body.** `ok` is `true` for the success statuses.
* **Check the status before reading the body.** A failed response's body is often an error, not data.
* **JSON bodies arrive as `unknown`.** A type guard checks the shape, and only then does the checker accept the value as the typed shape.

### Check your understanding

*These questions are written for this course.*

```quiz
A response has status `500`. What does `response.ok` give you?
○ `true`
→ Not quite. `ok` is `true` only for the success statuses, from 200 to 299.
◉ `false`
→ Right. A `500` is a server failure, so `ok` is `false`.
○ `500`
→ Not quite. `ok` is a yes or no, and the status is a separate number.
```

```quiz
Why does a JSON body arrive typed as `unknown`?
○ Because JSON bodies can't be read.
→ Not quite. They can be read. The issue is that the program didn't write their shape.
◉ Because the server decides the shape, so the program must check it before using it.
→ Right. An unchecked value from outside the program can't be trusted, so the checker won't assume a shape.
○ Because `unknown` is the default type of every value.
→ Not quite. `unknown` is chosen deliberately for data from outside.
```

```quiz
What does a type guard prove to the checker?
○ That the data came from the server.
→ Not quite. A guard checks the shape, not where the data came from.
◉ That the value has the shape the guard tests for, when the guard returns `true`.
→ Right. The guard's return type tells the checker what a `true` result means.
○ That the request was sent over an encrypted connection.
→ Not quite. A type guard has nothing to do with the connection.
```
