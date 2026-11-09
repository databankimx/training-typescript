# Homework: category filter

A shop's stock list tags each item with a category in a `data-category` attribute. The learner picks a category, and only the matching items should show. The page also reports how many are showing, so the learner can tell the list has changed.

> **Coming from JavaScript:** `dataset` and `classList.toggle` are the same in both languages. The `string | undefined` type on `dataset` values is the TypeScript part.

## The task

The page is in `index.html`, and each row has a `data-category` attribute. Here is the starting code, which logs the select:

```ts
const category = document.querySelector<HTMLSelectElement>("#category");

console.log(category);
```

Start from the code above, in your own file. Find the select, the list, and the count paragraph, each with the correct type. Write a function that goes through each row, shows the row when the select is `all` or its category matches, and hides it otherwise. It should then set the count to `Showing N items`, or `Showing 1 item` when only one row is shown. Call it once when the page loads, and again on each change of the select.

With `All` selected, the page should read:

```
Showing 3 items
```

## Hints

- `row.dataset.category` is `string | undefined`, so compare it with the select's value rather than using it on its own.
- Count the matching rows as you go, rather than counting the hidden ones afterwards.

## When you're stuck

Show the solution. It's a spoiler, so give it a proper attempt in your own file first.

## Quiz

```quiz
Why is `row.dataset.category` typed `string | undefined`?
○ Because every row always has a category.
→ Not quite. A row can lack the attribute, so the value may be missing.
◉ Because the attribute might not be set on a row, in which case there is no value.
→ Right. The checker makes you handle the missing case before comparing.
○ Because categories are numbers.
→ Not quite. They are text, and the type is about whether the attribute exists.
```
