## Summary: Unions and narrowing

A union names the possible types of a value, and narrowing tells the checker which one is in use at a given point.

* **A union lists the allowed types.** `string | number` allows text or a number, and nothing else.
* **`typeof` narrows a union to one type.** Inside the matching block, the checker allows that type's operations.
* **A null or truthiness check narrows a missing value.** After the check returns, the value is known to be present.
* **A literal union names exact values.** `"open" | "closed"` refuses any other text.
* **A `switch` over a literal union covers each value.** When a new value is added, the checker reports every function that needs updating.

### Check your understanding

*These questions are written for this course.*

```quiz
A value has the type `string | null`. Which check lets you call `.toUpperCase()` on it safely?
○ `if (value === undefined)`
→ Not quite. That check doesn't remove `null` from the type.
◉ `if (value === null) { return; }`, followed by the method call.
→ Right. After the check returns, the value is known to be text.
○ `if (typeof value === "null")`
→ Not quite. `typeof` never returns `"null"` for a null value, so this check doesn't narrow the type.
```

```quiz
What does `type Status = "open" | "closed";` mean for a value of that type?
○ It can be any text.
→ Not quite. Only the exact words in the union are allowed.
◉ It must be exactly `"open"` or exactly `"closed"`.
→ Right. A literal union allows only the values it lists.
○ It must be a number.
→ Not quite. The values are text, written as literals.
```

```quiz
After `if (typeof item === "string") { return item.length; }`, what does the checker know about `item` in the lines that follow?
○ It can still be a string.
→ Not quite. The string case returned, so the rest of the type is left.
◉ It is not a string, so the remaining types of the union apply.
→ Right. Once the string case has returned, the checker narrows the rest of the union.
○ Nothing. The checker forgets the earlier check.
→ Not quite. Narrowing carries forward through returns.
```
