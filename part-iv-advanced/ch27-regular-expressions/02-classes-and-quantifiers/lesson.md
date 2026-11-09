# Character classes and quantifiers

A shape is built from three things. A **character class** says which characters are allowed at one position: `\d` is any digit, and `[A-Z]` is any capital letter. A **quantifier** says how many: `{3}` is exactly three, `+` is one or more, and `*` is zero or more. An **anchor** says where the shape must sit.

> **Coming from JavaScript:** the syntax is identical. The `RegExp` label is the TypeScript part, and it lets the checker confirm the value is a pattern rather than text.

## The program

```typescript
const phone: RegExp = /^\d{3}-\d{4}$/;

console.log(phone.test("555-1234"));
console.log(phone.test("55-1234"));
```

```text
true
false
```

`\d{3}` takes exactly three digits, then the hyphen, then `\d{4}` takes exactly four. The anchors `^` and `$` make the whole text the shape. The second value has only two digits in its first part, so it is rejected.

Remove the anchors, and the second call returns `true`, because `55-1234` would be found inside a longer text such as `1555-1234`. The anchors are what turn a search into a validation.

## Try it yourself

- Test `555-12345`. Does it match, and why?
- Change `\d{4}` to `\d{4,}`. Which values now pass?

## Quiz

```quiz
Why are the anchors `^` and `$` needed to validate a phone number?
○ Because without them the pattern will not compile.
→ Not quite. The pattern compiles either way.
◉ Because without them the pattern matches a valid phone number inside longer text, which would be accepted.
→ Right. Anchors force the whole text to be the shape.
○ Because they make the pattern faster.
→ Not quite. Speed is not the reason.
```
