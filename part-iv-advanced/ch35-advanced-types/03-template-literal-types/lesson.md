# Template literal types

A template literal type uses the same backtick syntax as a template string, but at the type level. `` `/users/${string}` `` accepts any text that starts with `/users/`. When a template uses a union, the result is the union of every combination: `` `btn-${"small" | "large"}` `` is `"btn-small" | "btn-large"`.

> **Coming from JavaScript:** there is no JavaScript version, because the shape is checked at compile time. The types are the TypeScript part.

## The program

```typescript
type UserRoute = `/users/${string}`;

type Size = "small" | "large";
type ButtonClass = `btn-${Size}`;

const route: UserRoute = "/users/ada";
const button: ButtonClass = "btn-small";

console.log(route);
console.log(button);
```

```text
/users/ada
btn-small
```

`UserRoute` accepts any string that begins with `/users/`, so `"/users/ada"` fits. `ButtonClass` is the union of two strings, `"btn-small"` and `"btn-large"`, because the template distributes over the union in `Size`.

## Catching mistakes

Write `const other: UserRoute = "/accounts/ada";`, and the checker refuses it, because the text does not start with `/users/`. Write `const wrong: ButtonClass = "btn-medium";`, and the checker refuses that too. The shape is enforced before the program runs, which is what makes these types useful for route names and CSS class names.

## Try it yourself

- Add `"medium"` to `Size`, and check that `btn-medium` is now accepted.
- Write `const bad: ButtonClass = "btn-tiny";`, and press Check. What does the checker report?

## Quiz

```quiz
What is the type `` `btn-${"small" | "large"}` ``?
○ `string`, because templates always produce text.
→ Not quite. The type is narrower than `string`, because it lists the exact combinations.
◉ `"btn-small" | "btn-large"`, one string for each combination.
→ Right. A template over a union distributes over every member.
○ `"btn-small"`, the first member only.
→ Not quite. Every member of the union is included.
```
