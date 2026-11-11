# Combining answers

Real conditions are rarely a single question. "Can this customer buy the ticket?" might mean "has a ticket and is a member", or "is a member or has a voucher". The operators in this step combine answers into one, and they have one feature that surprises almost everyone the first time.

> **Coming from JavaScript:** `&&`, `||`, `!`, and `??` behave the same way in both languages. The types of the operands are where TypeScript adds its checks.

## And, or, and not

- **`&&`** (and) is `true` only when both sides are `true`.
- **`||`** (or) is `true` when at least one side is `true`.
- **`!`** (not) turns an answer around.

The program in `main.ts` uses all three:

```ts
console.log(hasTicket && isVip);
console.log(hasTicket || isVip);
console.log(!isVip);
```

`hasTicket` is `true` and `isVip` is `false`. So `&&` gives `false`, because not both are true. `||` gives `true`, because one of them is. `!isVip` gives `true`, because the answer about VIP status is no.

## Short-circuit: the surprising part

`&&` and `||` stop as soon as the answer is certain. If the left side of `&&` is `false`, the right side is never looked at. If the left side of `||` is `true`, the right side is skipped.

This matters when the right side does something, such as calling a function or changing a value. It also matters for defaults, because `||` returns the first truthy value, not just `true` or `false`:

```ts
console.log(nickname || "guest");
```

`nickname` is empty, so it's falsy. `||` skips past it and gives back `"guest"`. That's useful, and it's also a trap, which the next section explains.

## The fallback that only checks for missing

`??` works like `||`, but it only skips past a value that's missing: `null` or `undefined`. An empty string is not missing, so it's kept.

```ts
const shown: string = nickname ?? "guest";
```

With `nickname` empty, `??` keeps the empty string, and `shown` is `""`. Use `??` when an empty answer is a real answer, and `||` when any falsy value should be replaced.

## Press Run

The program is already in `main.ts`. You should see:

```
false
true
true
guest
```

## Try it

- Change `isVip` to `true`, and check all three lines. Which ones change?
- Change `nickname` to `"Ada"`. What does the last line show?
- Use `shown` with `??` instead of `||`, as in the example above, and print it. What's printed when `nickname` is empty?

## Quiz

```quiz
What does `true || false` give you?
○ `false`
→ Not quite. One side of `||` is `true`, and that's enough.
◉ `true`
→ Right. `||` is true when at least one side is true.
○ `undefined`
→ Not quite. The answer is a boolean.
```

```quiz
Which operator should you use for a default when an empty string is a real answer you want to keep?
○ `||`
→ Not quite. `||` replaces any falsy value, including the empty string.
◉ `??`
→ Right. `??` only replaces `null` and `undefined`, so an empty string is kept.
○ `&&`
→ Not quite. `&&` combines two answers. It doesn't provide a fallback.
```
