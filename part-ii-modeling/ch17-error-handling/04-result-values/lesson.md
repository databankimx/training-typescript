# Results as values

Throwing is right when a failure is unexpected, and the caller should stop unless it's handled. Often a failure is expected: a user typed something that isn't a number, and that's a normal event. For those cases, a function can return a **result**, which is either a success or a failure, and the type says which. The caller must check before using the value, and the checker helps by narrowing.

> **Coming from JavaScript:** the object shape is plain JavaScript. The union type and the narrowing on `ok` are the TypeScript part, and the checker uses them to stop the caller reading a value that might not exist.

## The program

The program is already in `main.ts`:

```ts
type Result = { ok: true; value: number } | { ok: false; error: string };

function parseAge(text: string): Result {
  const age = Number(text);
  if (Number.isNaN(age) || age < 0) {
    return { ok: false, error: `"${text}" is not a valid age` };
  }
  return { ok: true, value: age };
}
```

The rest of the program calls it twice, and the output is:

```
84
"abc" is not a valid age
```

The type `Result` is a union of two shapes. Each shape has an `ok` property, with a literal type: `true` for success, `false` for failure. Only the success shape has a `value`, and only the failure shape has an `error`.

The `if (first.ok)` check narrows the result. Inside the `if`, the checker knows the result is the success shape, so `first.value` is allowed. In the `else`, it knows the result is the failure shape, so `first.error` is allowed. Reading `value` without the check is refused, because the checker can't prove it's there.

## Why this beats throwing here

A user typing `abc` is not a bug in the program, so throwing would treat an ordinary event as an emergency. The result type keeps the failure visible in the signature, and it makes the caller decide what to show. The checker won't let a caller forget the failure case.

## Try it

- Call `parseAge("-3")` and print the result. What error message appears?
- Replace `if (first.ok)` with `if (true)`, and press **Check**. What does the checker report about `first.value`?
- Add a line `console.log(first.value);` after the whole `if` and `else` statement, not inside either branch. Press **Check**. Which line does the checker reject, and why?

## Quiz

```quiz
Why does `if (first.ok)` let the checker allow `first.value`?
○ Because `value` exists on every result.
→ Not quite. Only the success shape has a `value`.
◉ Because inside the `if`, the check narrows the result to the success shape.
→ Right. The `ok` property has a literal type, so the check tells the checker which shape it is.
○ Because the program runs the check and then adds the property.
→ Not quite. The checker narrows the type, and the program doesn't add anything.
```

```quiz
Why return a result, instead of throwing, when a user types text that isn't a number?
○ Because throwing is slower.
→ Not quite. The reason is that the failure is expected, not a bug.
◉ Because the failure is an ordinary event, and the result type makes the caller handle it.
→ Right. A result keeps expected failures in the signature, so they cannot be silently ignored.
○ Because `Result` is required by the checker for every function.
→ Not quite. The checker does not require results. The reason is clarity about expected failures.
```
