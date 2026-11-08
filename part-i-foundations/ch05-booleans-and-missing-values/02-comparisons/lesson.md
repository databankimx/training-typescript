# Comparisons

Programs decide things by comparing values: is the score high enough, is the password the same as the one on file, is the age under the limit. A comparison is a question, and its answer is a boolean.

> **Coming from JavaScript:** the comparison operators are the same in both languages. The checker adds one extra protection, which is described below.

## Comparing numbers

The operators are the ones you'd expect from school:

- **`>`** and **`<`** ask whether one value is bigger or smaller.
- **`>=`** and **`<=`** also accept equal.

The program in `main.ts` uses them to check a score:

```ts
console.log(score >= 50);
```

The score is `72`, which is at least `50`, so the answer is `true`.

## Equal and not equal

Two equals signs are easy to write and dangerous to trust. Use three:

- **`===`** asks whether two values are the same kind and the same value.
- **`!==`** asks whether they're different in either way.

```ts
console.log(score === 72);
console.log(score !== 72);
```

The first line is `true`, and the second is `false`, because the score is `72`.

## Why three equals signs

Some languages, including older versions of JavaScript, will quietly convert one value before comparing it. The number `72` and the text `"72"` can look equal to a program that does that, which hides a mistake. Three equals signs don't convert anything, so `72` and `"72"` are different.

The program compares the score with the text value using `Number(typed)` to convert it first, so the comparison is between two numbers:

```ts
console.log(score === Number(typed));
```

That's the step the program needs. Comparing a number with text directly is a mistake, and the checker reports it as one.

## What the checker adds

The checker doesn't only protect `===`. It looks at the two types being compared, and reports a comparison when the values can never be equal. If you write this:

```ts
console.log(score == typed);
```

the checker reports that the comparison looks unintentional, because a `number` and a `string` have no values in common. It does the same for `===`. So the two-equals-sign version of the mistake is caught too, before the program runs.

That's a real protection, and it covers the cases where a quiet conversion would hide a bug. It doesn't cover everything, though:

- **Values typed as `any`** turn the checker's view off, so no comparison is checked.
- **Comparisons between types that overlap** are allowed. `==` between `null` and `undefined` is one example. Programmers often write `value == null` on purpose, to catch both at once, and the checker accepts it.

The rule of thumb: use `===` by default, and use `== null` only when you mean both missing values.

## Press Run

The program is already in `main.ts`. You should see:

```
true
true
false
true
```

## Try it

- Change `score` to `49`, and check the first line. Does the answer change?
- Change `typed` to `"72 "`, with a space after it. What does `Number(typed)` give now, and what does the comparison show?
- Write `score <= 72` and `score < 72`. Which of them is `false`?

## Quiz

```quiz
What does `5 >= 5` give you?
○ `false`
→ Not quite. `>=` accepts equal values as well as bigger ones.
◉ `true`
→ Right. The value is equal, and `>=` allows equal.
○ `5`
→ Not quite. A comparison gives a boolean, not one of the values.
```

```quiz
Which operator checks that two values are the same kind and the same value?
○ `==`
→ Not quite. Two equals signs can convert one value before comparing, which hides mistakes.
◉ `===`
→ Right. Three equals signs compare without converting anything.
○ `=`
→ Not quite. A single equals sign stores a value in a box. It doesn't compare.
```

```quiz
Why does the checker report `score == typed` when `score` is a `number` and `typed` is a `string`?
○ Because `==` is always forbidden in TypeScript.
→ Not quite. `==` is allowed, but a comparison between types that can never be equal is reported.
◉ Because a number and a string have no values in common, so the comparison can never be true.
→ Right. The checker reports comparisons that can never be equal, whichever operator is used.
○ Because the program would crash.
→ Not quite. The program would run, and the checker reports the comparison before that.
```

```quiz
Which comparison is the usual intentional use of `==` in TypeScript?
○ `value == 0`
→ Not quite. `===` is the usual choice here, and the loose form hides the difference between `0` and `"0"`.
◉ `value == null`
→ Right. It matches both `null` and `undefined`, which is what the check usually means.
○ `value == ""`
→ Not quite. `===` is the usual choice, and the loose form converts values before comparing them.
```

