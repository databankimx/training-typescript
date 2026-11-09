# Ch20 · Typing the DOM

A web page is a tree of elements, and a program changes the page by finding elements in that tree, reading or changing them, and reacting when the learner does something. The browser calls that tree the **DOM**, the Document Object Model. The DOM's types are the browser's own, and the checker knows them. This chapter shows how to find an element with the right type, how to react to events with typed handlers, and how to change a page's text safely.

These lessons are **page steps**. Each one has a page, the HTML file in the step folder, and a script, `main.ts`. Press **Run** to open the page in its own window. The page loads `main.js`, which the runner makes from your TypeScript, so the page always shows the code you have in the editor.

## What you'll learn

1. How a page loads a script, and how a script finds the element it needs.
2. How a typed selector returns the element's specific type, and why a null check is needed.
3. How an event handler receives a typed event, and how to update the page from it.
4. How to change text safely, and why `textContent` is the default choice.

The chapter ends with a summary, and two homework exercises.
