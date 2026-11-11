## Summary: Forms

A form is read on submit, checked, converted where it needs to be a number, and shown or hidden as the learner's choices change.

* **Handle the submit event and call `preventDefault`.** The script then reads the values, and the page doesn't reload.
* **`FormData` returns text, or a file.** Its values are typed `FormDataEntryValue | null`, so they must be converted before use as numbers.
* **`checkValidity` reports whether a field meets its rules.** With `novalidate`, the script decides what the learner sees.
* **`valueAsNumber` gives a number, or `NaN` when there isn't one.** Check for `NaN` with `Number.isNaN`.
* **A choice can show, hide, and require a field together.** Work the rule out once, and apply it to all three.

### Check your understanding

*These questions are written for this course.*

```quiz
Why does a submit handler call `event.preventDefault()`?
○ To clear the form after it is read.
→ Not quite. The values are still there after the handler runs.
◉ To stop the browser's default action of sending the form and reloading the page.
→ Right. The script takes over, and the page stays as it is.
○ To check that the fields are valid.
→ Not quite. Validity is checked by `checkValidity`. `preventDefault` only cancels the default action.
```

```quiz
A field holds an empty number input. What does `valueAsNumber` give?
○ `0`
→ Not quite. An empty field is `NaN`, so it can be told apart from zero.
◉ `NaN`
→ Right. Check for it with `Number.isNaN`, not `===`.
○ `undefined`
→ Not quite. The conversion gives `NaN` for a field with no number.
```

```quiz
Why would a script set `required` on a field each time its choice changes?
○ Because `required` is removed when the page is reloaded.
→ Not quite. The page reload isn't the reason. The field's requirement should match its visibility.
◉ So a field that is hidden is not required, and a visible one is.
→ Right. A required field the learner can't see would block the form.
○ Because `required` only works on hidden fields.
→ Not quite. `required` applies to visible fields that the learner must fill in.
```
