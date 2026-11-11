## Summary: Advanced types

Advanced types describe other types, and they are checked before the program runs.

* **A conditional type picks one of two types.** `T extends U ? X : Y` chooses based on the test, and `infer` names a part of the type.
* **A mapped type rewrites every property.** `{ [K in keyof T]: ... }` follows the keys of the original type, so changes flow through.
* **A template literal type describes text with a shape.** A union inside the template expands to every combination.
* **These types enforce rules without changing values.** The output of the program is unaffected, and the checker refuses what does not fit.

### Check your understanding

*These questions are written for this course.*

```quiz
What does `T extends Promise<infer Inner> ? Inner : T` do when `T` is `string`?
○ It returns `Promise<string>`.
→ Not quite. A string is not a promise, so the condition does not match.
◉ It returns `string`, because the condition does not match and the else branch is taken.
→ Right. The false branch returns the type unchanged.
○ It returns `unknown`.
→ Not quite. A failed condition returns the else branch, not unknown.
```

```quiz
Why does a mapped type follow changes to the original interface?
○ Because the checker copies the interface at run time.
→ Not quite. The checker works at compile time, and nothing is copied at run time.
◉ Because the mapping loops over the keys of the original type, so new keys appear in the mapped type.
→ Right. The mapped type is defined in terms of the original keys.
○ Because mapped types are stored in a file.
→ Not quite. They are types, derived from the original on each check.
```

```quiz
Which value does `const x: `item-${1 | 2}` = "item-3";` produce?
○ It is accepted, because the template accepts any text starting with `item-`.
→ Not quite. The template lists only the combinations 1 and 2.
◉ A type error, because `item-3` is not one of the combinations.
→ Right. The union limits the template to the listed values.
○ It is accepted at run time but flagged by the checker.
→ Not quite. The check happens before the program runs, so it is refused outright.
```
