## Summary: Unknown and any

Values from outside the program need honest types. `unknown` admits that the type isn't known yet, and `any` removes the checks entirely.

* **`unknown` accepts any value.** The checker refuses operations on it until the type has been proven.
* **`typeof` and checks narrow an unknown value.** Once proven, the value can be used as that type.
* **A type guard proves a shape.** A return type such as `value is { name: string }` tells the checker what a `true` result means.
* **`any` turns the checker off for a value.** Every operation is allowed, so mistakes appear only when the program runs.
* **Prefer `unknown` to `any`.** Use `any` only at the edge of the code, during migration, and convert it as early as you can.

### Check your understanding

*These questions are written for this course.*

```quiz
A value comes from a web request and its type is not known. Which label is the safer choice?
○ `any`, so the program never complains about it.
→ Not quite. `any` hides the mistakes the checker would otherwise report.
◉ `unknown`, so the value must be checked before it is used.
→ Right. `unknown` makes the checker require proof before any operation.
○ `number`, because most values are numbers.
→ Not quite. A label that's wrong for the value causes errors the checker can't explain.
```

```quiz
Which check narrows an `unknown` value to text?
○ `if (value.length > 0)`
→ Not quite. The checker refuses that line, because the value's type isn't known yet.
◉ `if (typeof value === "string")`
→ Right. The `typeof` check proves the type, and narrows the value inside the block.
○ `if (value)`
→ Not quite. A truthiness check doesn't prove the value is text.
```

```quiz
Why does `any` let a call such as `shout(42)` pass the checker when `shout` calls `toUpperCase`?
○ Because numbers have `toUpperCase`.
→ Not quite. They don't. The checker just doesn't check `any`.
◉ Because the value is `any`, so the checker doesn't check the operations on it.
→ Right. An `any` value is trusted, and its operations are not checked.
○ Because `shout` is never called.
→ Not quite. It is called in the example, and the checker still doesn't look inside it.
```
