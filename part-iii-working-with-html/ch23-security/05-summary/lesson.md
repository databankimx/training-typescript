## Summary: Security

Text that came from outside the program is data, and it must never be read as markup.

* **`innerHTML` reads text as markup.** Learner text placed that way can change the page for everyone who sees it.
* **`textContent` and `createElement` keep text as text.** Build elements for anything the learner can type.
* **Check a link's scheme before using it.** Parse the address with `URL`, and accept only `http:` or `https:`.
* **Escape only where markup must be built from a string.** Replace `&` first, then the other characters, and escape only the untrusted parts.

### Check your understanding

*These questions are written for this course.*

```quiz
A program shows a learner's name with `innerHTML`. What is the risk?
○ The name becomes harder to read.
→ Not quite. The risk is what the name's markup can do, not how it looks.
◉ Markup in the name becomes part of the page, and can change it for other people.
→ Right. Text read as markup is trusted by the browser, so it can alter the page.
○ The name is stored twice.
→ Not quite. Storage isn't the issue. The issue is markup being read as part of the page.
```

```quiz
Why does a safe link check parse the address with `new URL`?
○ Because `new URL` is required by the checker.
→ Not quite. The checker doesn't require it. The reason is what the browser will do with the address.
◉ Because the parsed protocol shows the real scheme, which decides what the link does.
→ Right. Checking the parsed scheme is the reliable test.
○ Because `new URL` removes markup from the address.
→ Not quite. Removing markup isn't what the check does. It reads the scheme.
```

```quiz
Why does `escapeHtml` replace `&` before the other characters?
○ Because `&` is the only character that must be escaped.
→ Not quite. Several characters are escaped.
◉ Because the entities the other replacements create contain `&`, and it must not be escaped again.
→ Right. The order keeps each entity intact.
○ Because `&` is shorter than the others.
→ Not quite. Length isn't the reason for the order.
```
