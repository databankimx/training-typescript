# Conditional fields

Some fields only make sense for one choice. A postal address is needed for post, and not for collecting at the shop. The page should show the field when it's needed, hide it when it isn't, and require it only while it's visible. Those three things must agree, or the learner is asked for an address they can't see, or can't give.

> **Coming from JavaScript:** `classList.toggle`, `change`, and `required` are the same in both languages. The `HTMLLabelElement` and `HTMLSelectElement` types are the TypeScript part.

## The program

The page has a delivery list, an address field, and a status line. The script is in `main.ts`:

```ts
function refresh(select: HTMLSelectElement, field: HTMLElement, input: HTMLInputElement, note: HTMLElement): void {
  const needsAddress = select.value === "post";
  field.classList.toggle("hidden", !needsAddress);
  input.required = needsAddress;
  note.textContent = needsAddress
    ? "Enter an address for postal delivery."
    : "Pick up at the shop. No address needed.";
}

if (delivery !== null && addressField !== null && address !== null && status !== null) {
  refresh(delivery, addressField, address, status);
  delivery.addEventListener("change", () => {
    refresh(delivery, addressField, address, status);
  });
}
```

Press **Run**. The page starts on `Post`, so the status reads `Enter an address for postal delivery.` and the address field is shown. Change the list to `Pick up at the shop`. The address field disappears, the status changes, and the address is no longer required.

- **`refresh`** works out the answer once, from the list's value, and then applies it to all three things: the field's visibility, its `required` state, and the message.
- **It runs twice.** Once when the page loads, so the starting state is right, and again on every change.
- **`classList.toggle("hidden", condition)`** adds the class when the condition is `true` and removes it when `false`. Here the condition is "the address is needed", so the class is removed when it's needed.

## Keep the rules in one place

Each of the three effects reads the same `needsAddress` value. If they each checked the list themselves, a future change could leave one of them out of step with the others. Working the rule out once is what keeps them agreeing.

## Try it

- Change `"post"` in the `needsAddress` line to `"pickup"`, and run. What does the page show on load, and why?
- Remove the `input.required = needsAddress;` line, then choose pick up, and submit with an empty address field. What does the learner see?
- Add a third option, `"locker"`, to the list, and decide whether it needs an address.

## Quiz

```quiz
Why does the script call `refresh` once when the page loads, as well as on each change?
○ Because the change event fires twice.
→ Not quite. The event fires once per change, and the call on load is separate.
◉ So the page starts in the right state, before the learner has changed anything.
→ Right. Without the first call, the field and message would show the state written in the HTML.
○ Because `refresh` has to run before the page can load.
→ Not quite. The page loads without it, and the call sets the starting state.
```

```quiz
What does `classList.toggle("hidden", !needsAddress)` do when the address is needed?
○ It adds the `hidden` class, so the field is hidden.
→ Not quite. When the address is needed, the field must show, so the class is removed.
◉ It removes the `hidden` class, so the field is shown.
→ Right. The second argument is `true` when the class should be on, so `!needsAddress` is `false` here.
○ It changes the field's `required` setting.
→ Not quite. That's a separate line in the function. `toggle` only changes the class.
```
