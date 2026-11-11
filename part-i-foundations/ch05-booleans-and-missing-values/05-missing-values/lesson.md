# Missing values

Sometimes there's no value at all: the user didn't type a middle name, the sensor didn't report, the address form was left blank. JavaScript has two words for "nothing here", and TypeScript makes you say which kind of nothing you expect. That's one of its more useful habits.

> **Coming from JavaScript:** `null` and `undefined` are the same values in both languages. The `| undefined` and `| null` labels are the TypeScript part, and they tell the checker that a value might be missing.

## Two kinds of nothing

- **`undefined`** usually means "not set yet". A box that was created without a value holds `undefined`.
- **`null`** usually means "deliberately empty". Someone or something set it to nothing on purpose.

Most of the time you don't need to choose between them. What matters is that the label tells the checker the value might be missing, and the checker then insists that you handle that case.

## Labels that allow for missing values

The program in `main.ts` uses two labels:

```ts
const middleName: string | undefined = undefined;
const age: number | null = null;
```

The vertical bar means "or". `string | undefined` says the box holds text, or nothing. The checker won't let you use `middleName` as text until you've dealt with the missing case. That's the promise, and it's the same kind of promise as the labels in Chapter 2.

## Falling back to a default

`??` gives a fallback when a value is missing:

```ts
console.log(middleName ?? "none");
console.log(age ?? 0);
```

`middleName` is missing, so the answer is `none`. `age` is missing, so the answer is `0`.

## Reading a property that might not exist

An object can hold a box with no value in it. If you ask for something that isn't there, the answer is `undefined`, and the next step you try, such as calling a method, will fail. The **optional chaining** operator, `?.`, stops that failure. It checks for a missing value first:

```ts
console.log(profile.city?.toUpperCase() ?? "unknown");
```

`profile` is an empty object, so `profile.city` is `undefined`. The `?.` stops there and gives `undefined` rather than failing. The `??` then gives `"unknown"`. Chapter 8 covers objects properly.

## Press Run

The program is already in `main.ts`. You should see:

```
none
0
unknown
```

## Try it

- Change `middleName` to `"Ada"`, and check the first line.
- Change `age` to `42`, and check the second line. Does the `null` label still allow it?
- Set `profile.city` by writing `profile.city = "Dallas";` below the object. What does the last line show now?

## Quiz

```quiz
What does `undefined ?? "none"` give you?
○ `undefined`
→ Not quite. `??` replaces a missing value with the fallback.
◉ `"none"`
→ Right. `undefined` is missing, so `??` gives the fallback.
○ An error
→ Not quite. Missing values are normal here, and `??` handles them.
```

```quiz
What does `?.` do when the value before it is missing?
○ It stops with an error.
→ Not quite. That's what happens without `?.`. With it, the program keeps going.
◉ It stops and gives `undefined`, without trying the rest.
→ Right. `?.` checks for a missing value first, so the rest of the chain is skipped.
○ It turns the missing value into `0`.
→ Not quite. `?.` doesn't convert anything. A fallback from `??` does that.
```
