# Narrowing missing values

A value that might be missing is the most common union in real code: `string | null` or `string | undefined`. The checker won't let you use the text until you've checked for the missing case. Two checks do the job. An explicit `=== null` check handles `null` on its own, and a truthiness check such as `!text` handles both missing values and empty text.

> **Coming from JavaScript:** the checks are the same in both languages. The union labels and the narrowing are the TypeScript part.

## The program

The program is already in `main.ts`:

```ts
function greet(name: string | null): string {
  if (name === null) {
    return "Hello, stranger";
  }
  return `Hello, ${name}`;
}

function firstWord(text: string | undefined): string {
  if (!text) {
    return "(empty)";
  }
  return text.split(" ")[0];
}

console.log(greet(null));
console.log(greet("Ada"));
console.log(firstWord("Grace Hopper"));
console.log(firstWord(undefined));
```

Press **Run**. You should see:

```
Hello, stranger
Hello, Ada
Grace
(empty)
```

Each function checks first, and uses the value second:

- **`greet`** checks `name === null`. After that check returns, the checker knows `name` is a `string`, so it can be put into the template.
- **`firstWord`** checks `!text`. That's true for `undefined` and for the empty text `""`. After it returns, the checker knows `text` is a `string`, so `split` is allowed.

## Which check to use

Use `=== null` when `null` is the only missing case you need to handle, and when an empty string is a real value. Use the truthiness check when both missing values and empty text should count as nothing, as they do in `firstWord`. Be deliberate about which one you choose, because the two behave differently for `""`.

## Try it

- Call `greet(undefined)`, and press **Check**. Why is it reported?
- Change `firstWord` to use `text === undefined` in place of `!text`. Call it with `""`. What's printed now?
- Remove the check from `firstWord`, and press **Check**. What does the checker say about `text.split`?

## Quiz

```quiz
After `if (name === null) { return ...; }`, what type does the checker give `name`?
○ `string | null`
→ Not quite. The check removed the `null` case, because the function has already returned for it.
◉ `string`
→ Right. Once the null case has returned, only the text is left.
○ `null`
→ Not quite. That's the case the check handled, and it has already returned.
```

```quiz
Why would `firstWord("")` print `(empty)` with a truthiness check, but not with `text === undefined`?
○ Because the checker treats empty text as `undefined`.
→ Not quite. The checker doesn't convert values.
◉ Because an empty string is falsy, so `!text` catches it, while `=== undefined` does not.
→ Right. The truthiness check treats empty text as nothing, and the undefined check only catches the missing value.
○ Because `split` can't handle empty text.
→ Not quite. `split` handles empty text, and the check decides whether the function reaches it.
```
