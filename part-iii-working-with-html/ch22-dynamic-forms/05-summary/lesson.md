## Summary: Dynamic forms

A page that changes keeps its data in the script and draws the rows from it, so the rows and the data never disagree.

* **`createElement` and `append` add rows.** A new element isn't on the page until it's added.
* **One handler on the list removes any row.** Event delegation covers rows added later, and `closest` finds the row to remove.
* **Filtering hides rows, and keeps them.** Clearing the filter brings every row back without rebuilding the list.
* **Sorting works on a copy of the data.** The rows are redrawn from the sorted copy.

### Check your understanding

*These questions are written for this course.*

```quiz
Why is a single click handler on the list better than one handler per row, for a list that changes?
○ Because one handler runs faster than many.
→ Not quite. The reason is coverage, not speed.
◉ Because rows added later are covered by the list's handler, and need no handler of their own.
→ Right. Clicks bubble up to the list, so every row, old or new, is handled.
○ Because rows cannot have their own handlers.
→ Not quite. Rows can have handlers. The list's handler is simply easier to keep working.
```

```quiz
What does `classList.toggle("hidden", !matches)` do to a row that doesn't match?
○ It removes the row from the page.
→ Not quite. The row stays in the page, and only its visibility changes.
◉ It adds the `hidden` class, so the row is not shown.
→ Right. The row remains in the page, and clearing the filter shows it again.
○ It changes the row's text.
→ Not quite. The text is unchanged. Only the class changes.
```

```quiz
What is the main risk of sorting the original array in place?
○ The sort is slower.
→ Not quite. Speed isn't the concern.
◉ The data's order changes for every later use, not only for the display.
→ Right. Sorting a copy keeps the original order, and only the drawn rows change.
○ The rows cannot be drawn again.
→ Not quite. Rows can always be drawn again. The risk is in the data itself.
```
