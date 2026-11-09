# Homework: safe title

A report generator receives its title from a plug-in, and the plug-in may send text, a number, or nothing at all. The title type is therefore `unknown`. The generator shows the title in capitals when it's text, and falls back to a placeholder otherwise.

> **Coming from JavaScript:** `typeof` and `toUpperCase` work the same way in both languages. The `unknown` label is the TypeScript part.

## The task

Here is the starting code, which prints the title as it arrived:

```ts
const title: unknown = "monthly report";

console.log(title);
```

Start from the code above, in your own file. Print the title in capitals when it's text. When the value isn't text, print `No title`. With the title above, the output should be:

```
MONTHLY REPORT
```

## Hints

- Narrow the value with `typeof` before you call `toUpperCase`. Without the narrowing, the checker refuses the call.
- An `else` branch handles every value that isn't text.

## When you're stuck

Show the solution. It's a spoiler, so give it a proper attempt in your own file first.

## Quiz

```quiz
Why is `title.toUpperCase()` refused until the `typeof` check?
○ Because `toUpperCase` is slow on unknown values.
→ Not quite. The reason is the type, not speed.
◉ Because the checker can't use a method on an unknown value until its type is proven.
→ Right. The narrowing proves the value is text, and then the method is allowed.
○ Because capital letters are not allowed in programs.
→ Not quite. Capitals are normal text, and the method is fine once the type is proven.
```
