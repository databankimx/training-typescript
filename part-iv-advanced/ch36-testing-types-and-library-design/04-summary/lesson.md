## Summary: Testing types and library design

A library's types are a promise, and these tools keep the promise visible and stable.

* **A type equality test fails when two types differ.** Keep one per type that callers depend on, so a silent change becomes a compile error.
* **Overloads give each input its own result type.** The implementation signature is hidden, and callers see only the listed signatures.
* **Inference keeps calls short.** A generic parameter that the caller's values determine does not need a type argument.

### Check your understanding

*These questions are written for this course.*

```quiz
Why is a type equality test better than relying on assignability for a library's return type?
○ Because assignability is slower to check.
→ Not quite. The reason is precision.
◉ Because assignability accepts a wider type, so a silent widening would pass the test.
→ Right. Equality fails when the type changes at all, even when callers would still compile.
○ Because assignability cannot check return types.
→ Not quite. It can, but it accepts more than equality does.
```

```quiz
What happens when a call matches none of an overload group's signatures?
○ The implementation runs with the input.
→ Not quite. The checker refuses the call before anything runs.
◉ The checker reports that no overload accepts the argument.
→ Right. Only the listed signatures are offered to callers.
○ The call returns `undefined`.
→ Not quite. The call is refused, not answered with undefined.
```

```quiz
Why does the generic `createList` infer `T` from the callback?
○ Because the callback is always named first.
→ Not quite. The position of the callback does not decide it.
◉ Because the callback's return type is the place where `T` appears, so the checker reads it from there.
→ Right. The value the caller supplies determines the type parameter.
○ Because the caller must pass `T` as a string.
→ Not quite. The caller never writes it in the normal case.
```
