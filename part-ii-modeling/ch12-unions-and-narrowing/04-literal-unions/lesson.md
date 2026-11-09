# Literal unions

Sometimes a value must be one of a fixed set of words: an order is open, closed, or pending, and nothing else. A **literal union** lists those exact values, so the checker refuses a typo such as `"opne"` before the program runs. Combined with a `switch`, the checker can also confirm that every value has been handled.

> **Coming from JavaScript:** `switch` and `return` work the same way in both languages. The `type Status = ...` line and the checker's coverage check are the TypeScript part.

## The program

The program is already in `main.ts`:

```ts
type Status = "open" | "closed" | "pending";

function label(status: Status): string {
  switch (status) {
    case "open":
      return "Accepting orders";
    case "closed":
      return "Closed for the day";
    case "pending":
      return "Awaiting approval";
  }
}

console.log(label("open"));
console.log(label("pending"));
```

Press **Run**. You should see:

```
Accepting orders
Awaiting approval
```

- **`type Status = "open" | "closed" | "pending";`** names the allowed values. Each one is a literal, the exact text, not just any text.
- **`label(status: Status)`** accepts only those three values. `label("opened")` is refused, because `"opened"` is not in the list.
- **The `switch`** has one case for each value, and each case returns. The checker sees that every value of `Status` returns something, so the function doesn't need a `default` case.

## Why cover every case

If you add a fourth status, such as `"archived"`, the checker reports the function, because one of the values has no case that returns. That's the point of a literal union with a `switch`: the code must be updated when the set of values changes. Relying on a `default` case would hide that work.

## Try it

- Call `label("opened")`, and press **Check**. What does the checker say?
- Add `| "archived"` to the `Status` type, and press **Check**. Which line is reported?
- Remove the `case "pending":` block, and press **Check**. What does the checker say about the function?

## Quiz

```quiz
What does `type Status = "open" | "closed" | "pending";` allow a value of type `Status` to be?
○ Any text.
→ Not quite. A literal union allows only the exact values it lists.
◉ Exactly one of the three listed words.
→ Right. The value must be `"open"`, `"closed"`, or `"pending"`, and nothing else.
○ Any text, provided it has at least three letters.
→ Not quite. The checker doesn't test the length. It checks the exact values.
```

```quiz
Why does a `switch` over a literal union with a case for every value not need a `default`?
○ Because `default` is not allowed with unions.
→ Not quite. `default` is allowed, but it isn't needed here.
◉ Because every value of the type has its own case that returns, so no value is left unhandled.
→ Right. When the cases cover every value, the function always returns.
○ Because the checker adds `default` automatically.
→ Not quite. The checker doesn't add code to the program.
```
