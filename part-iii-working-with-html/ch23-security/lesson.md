# Ch23 - Security

Any text a page shows that came from a person, a file, or a web request can be hostile. If a program places that text into the page as markup, the text can change the page itself: it can add links, hide content, or run code. That attack is called **cross-site scripting**, or **XSS**. It's one of the most common weaknesses in web software, and it almost always comes from the same mistake: treating text as if it were trusted markup.

This chapter shows the mistake, the safe alternative, and the cases where markup is unavoidable. The unsafe examples here only change the learner's own page, and no code is run.

## What you'll learn

1. How `innerHTML` reads text as markup, and why that lets input change the page.
2. How to build a page from text with `textContent`, so typed text stays text.
3. How to accept a link only when its address uses a safe scheme.
4. How to escape text when markup has to be built from strings.

The chapter ends with a summary, and two homework exercises.
