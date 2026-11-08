# Homework: greeting

Some people tell you their nickname when they sign up, and some don't. A greeting shouldn't fail because the nickname is missing, so it needs a fallback. This exercise is about giving it one.

> **Coming from JavaScript:** template strings and `??` work the same way in both languages. The `| undefined` label is the TypeScript part.

## The task

Here is the starting code, where the nickname is missing:

```ts
const nickname: string | undefined = undefined;

console.log(nickname);
```

Start from the code above, in your own file, and change it so that it prints this greeting, using `guest` when there's no nickname:

```
Hello, guest!
```

## Hints

- `??` gives a fallback when a value is missing.
- A template string can hold the name inside the greeting.

## When you're stuck

Show the solution. It's a spoiler, so give it a proper attempt in your own file first.

## Quiz

```quiz
Why use `??` here, rather than `||`?
○ Because `||` can't be used with text.
→ Not quite. `||` works with text. The question is which values it replaces.
◉ Because `??` only replaces a missing value, so an empty nickname would be kept.
→ Right. `??` replaces `null` and `undefined`, and nothing else.
○ Because `??` is faster.
→ Not quite. The reason is what the fallback is allowed to replace.
```
