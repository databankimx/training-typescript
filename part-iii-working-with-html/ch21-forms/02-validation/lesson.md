# Validation

A form field can carry rules, such as `required` or `type="email"`, and the browser knows whether its value meets them. `checkValidity()` returns that answer as a `boolean`. The script can then decide what the learner sees, instead of leaving the decision to the browser's own message.

> **Coming from JavaScript:** `checkValidity` and the `required` attribute are the same in both languages. The `HTMLInputElement` type is the TypeScript part, and it's what lets `email.value` and `checkValidity` be used.

## Why the form is marked novalidate

The form has the attribute `novalidate`. Without it, the browser checks the fields before the submit event fires. A field that fails would stop the submit, and show its own message, before the script runs. With `novalidate`, the submit event always fires, and the script decides. That's the reason this page can show its own wording.

## The program

The page has an email field and a message paragraph. The script is in `main.ts`:

```ts
const form = document.querySelector<HTMLFormElement>("#signup");
const email = document.querySelector<HTMLInputElement>("#email");
const message = document.querySelector<HTMLParagraphElement>("#message");

if (form !== null && email !== null && message !== null) {
  form.addEventListener("submit", (event: SubmitEvent) => {
    event.preventDefault();
    if (email.checkValidity()) {
      message.textContent = `Thanks, we will write to ${email.value}.`;
    } else {
      message.textContent = "Please enter a valid email address.";
    }
  });
}
```

Press **Run**. Type `ada@example.com` into the field, and press **Sign up**. The message reads `Thanks, we will write to ada@example.com.`. Then clear the field, or type `ada` alone, and press Sign up again. The message changes to `Please enter a valid email address.`

- **`checkValidity()`** is `true` when the field meets its rules. `required` fails on an empty field, and `type="email"` fails on text that isn't an address.
- **The `if` and `else`** give the learner a message that matches what happened.

## Try it

- Remove `novalidate` from the form, and submit an empty field. What appears, and which line of the script ran?
- Change the message in the `else` branch to say what was wrong, using `email.validationMessage` instead of the fixed text.
- Add a second field for a name, with `required`, and check both before showing the thanks message.

## Quiz

```quiz
What does `novalidate` on the form change?
○ It stops the learner typing into the fields.
→ Not quite. The fields still accept typing. The attribute only changes when the browser checks them.
◉ It lets the submit event fire even when a field is invalid, so the script decides what to show.
→ Right. Without it, the browser checks first, and can stop the submit before the script runs.
○ It removes the `required` rule from the fields.
→ Not quite. The rules stay. The attribute only moves the checking to the script.
```

```quiz
What does `email.checkValidity()` return for an empty field marked `required`?
○ `true`, because empty fields are allowed.
→ Not quite. A required field must have a value, so an empty one fails.
◉ `false`, because the field fails its `required` rule.
→ Right. The result is a boolean, which the script uses to choose its message.
○ `undefined`, because the field has no value.
→ Not quite. `checkValidity` always returns `true` or `false`.
```
