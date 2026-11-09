# Validating input

Validation is the most common job for a regular expression. A form field should accept a value only when it has the expected shape, and a pattern is a compact way to state that shape. The essential discipline is to anchor the pattern, and to choose character classes that are as narrow as the rule.

> **Coming from JavaScript:** the validator is identical. The `code: string` and `: boolean` labels are the TypeScript part, and they make the function's contract visible at its call sites.

## The program

```typescript
function isValidCode(code: string): boolean {
  return /^[A-Z]{2}-\d{4}$/.test(code);
}

console.log(isValidCode("AB-1234"));
console.log(isValidCode("ab-1234"));
```

```text
true
false
```

The pattern requires two capital letters, a hyphen, and four digits, and the anchors make that the entire value. The lowercase `ab-1234` is rejected, because `[A-Z]` does not include lowercase letters. A case-insensitive flag would accept it, which is why the flag is left off.

## A pattern that is too loose

Remove the anchors, and the validator accepts `XAB-12345` as valid, because `AB-1234` is found inside it. Accepting more than the rule allows is the common failure, and it often goes unnoticed until a bad value reaches the database. Always test the values you want to reject, not only the ones you want to accept.

## Try it yourself

- Test `AB-12345` and `AB-123`. Which one does the validator accept, and why?
- Remove the `^` and `$` anchors, and test `XAB-1234`. What does the validator now return?

## Quiz

```quiz
Why is `ab-1234` rejected by `/^[A-Z]{2}-\d{4}$/`?
○ Because `ab` is not a word.
→ Not quite. The rule is about characters, not whether they form a word.
◉ Because `[A-Z]` matches only capital letters, and the value has lowercase ones.
→ Right. A character class is exactly as wide as its listed characters.
○ Because the pattern requires a space.
→ Not quite. The pattern requires a hyphen, and no space.
```
