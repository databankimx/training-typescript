# Homework: https only

Some sites are only safe over an encrypted connection, so a link to them should be accepted only when it uses `https:`. A plain `http:` address is refused, even though it's a web address. The exercise tightens the link check from the safe links step so that only `https:` passes.

> **Coming from JavaScript:** `new URL`, `protocol`, and `removeAttribute` are the same in both languages. The `LinkCheck` union is the TypeScript part, from the earlier chapter on unions.

## The task

The page has an address field pre-filled with `http://example.com`, a status line, and a link. Here is the starting code, which logs the three elements:

```ts
const address = document.querySelector<HTMLInputElement>("#address");
const status = document.querySelector<HTMLParagraphElement>("#status");
const open = document.querySelector<HTMLAnchorElement>("#open");

console.log(address, status, open);
```

Start from the code above, in your own file. Write a `checkLink` function that returns `{ ok: true, href }` for an address that parses and uses `https:`. For any other address, return `{ ok: false, message }`, with the message `That isn't a web address.` when it doesn't parse, and `Only https links are allowed.` when the scheme is anything else. Show the status and set the link's address as the safe links step did.

With the default `http://example.com`, the status should read:

```
Only https links are allowed.
```

## Hints

- The check for `"https:"` is the only test you need, because a parsed address has exactly one protocol.
- Remember to remove the link's address for a refused link, so it can't be followed.

## When you're stuck

Show the solution. It's a spoiler, so give it a proper attempt in your own file first.

## Quiz

```quiz
Why does `checkLink` need the `try` around `new URL` in this exercise, as it did before?
○ Because `https` links cannot be parsed.
→ Not quite. Valid https addresses parse without error.
◉ Because text that isn't an address makes `new URL` throw, and the function must return a message instead.
→ Right. The `catch` turns a failed parse into a refusal the learner can read.
○ Because the `try` makes the check faster.
→ Not quite. The `try` handles failure, not speed.
```
