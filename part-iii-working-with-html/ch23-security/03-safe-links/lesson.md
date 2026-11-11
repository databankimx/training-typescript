# Safe links

A link's `href` is an address, and some addresses run code instead of opening a page. A `javascript:` address is the classic case. If a learner's text becomes the `href` without a check, the link can do anything the page can do. The safe approach is to parse the text with `URL`, accept it only when its scheme is `http:` or `https:`, and set the `href` only after that check passes.

> **Coming from JavaScript:** `new URL`, `protocol`, and `removeAttribute` are the same in both languages. The `LinkCheck` union and the `try` around `new URL` are the TypeScript and error-handling parts, from the earlier chapters.

## The program

The page has an address field, a status line, and a link. The script is in `main.ts`, and its key function is `checkLink`:

```ts
type LinkCheck = { ok: true; href: string } | { ok: false; message: string };

function checkLink(text: string): LinkCheck {
  let url: URL;
  try {
    url = new URL(text);
  } catch (error: unknown) {
    return { ok: false, message: "That isn't a web address." };
  }
  if (url.protocol !== "https:" && url.protocol !== "http:") {
    return { ok: false, message: "Only http and https links are allowed." };
  }
  return { ok: true, href: url.href };
}
```

Press **Run**. The field holds `https://example.com`, so the status shows `Safe link: https://example.com/`, and the link can be followed. Type `javascript:alert(1)` into the field instead, and the status says `Only http and https links are allowed.`, and the link has no address at all.

- **`new URL(text)`** parses the address. It throws if the text isn't an address, which the `catch` turns into a message.
- **`url.protocol`** is the scheme, such as `https:`. The check compares it with the two safe schemes, and refuses everything else.
- **`removeAttribute("href")`** removes the link's address when the check fails, so a refused link cannot be followed.

## Check the scheme, not the text

Checking that an address merely starts with `https` is not enough, because the check must look at what the browser will actually do with it. Parsing the address and reading its protocol is the reliable test, and it's the same test whatever characters the learner types.

## Try it

- Type `http://example.com` into the field. Is it accepted, and why?
- Type `ftp://example.com`. What does the status say, and why?
- Remove the `if` check on `protocol`, and type `javascript:alert(1)`. What does the status show now?

## Quiz

```quiz
Why does `checkLink` parse the text with `new URL` rather than checking that it starts with `https`?
○ Because `new URL` is faster.
→ Not quite. The reason is what the browser will actually do with the address.
◉ Because the browser reads the parsed address, and parsing shows its real scheme.
→ Right. The protocol of the parsed address is the reliable test for what the link does.
○ Because strings cannot be compared.
→ Not quite. Strings can be compared, but a prefix check can be fooled.
```

```quiz
What does `removeAttribute("href")` do when the check fails?
○ It deletes the link from the page.
→ Not quite. The link stays on the page, and only its address is removed.
◉ It removes the address, so the refused link cannot be followed.
→ Right. A link with no `href` does not navigate anywhere.
○ It changes the link's text.
→ Not quite. The text is unchanged. Only the address is removed.
```
