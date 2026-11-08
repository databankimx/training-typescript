# True and false

A lot of programming is deciding what to do next, and every decision starts with a question that has a yes or no answer. The type for those answers is `boolean`. It has exactly two values, `true` and `false`, and it's the most honest type there is: it doesn't pretend to know more than that.

> **Coming from JavaScript:** `true`, `false`, and `!` are the same in both languages. The `: boolean` label is the TypeScript part.

## The program

The program is already in `main.ts`:

```ts
const isOpen: boolean = true;
const isLocked: boolean = false;

console.log(isOpen);
console.log(!isLocked);
```

Press **Run**. You should see:

```
true
true
```

- **`const isOpen: boolean = true;`** stores the answer `true` in a box called `isOpen`. The name reads like a question, which is a helpful habit. A box called `isOpen` tells the next reader what it's for.
- **`!`** is the not operator. It turns `true` into `false`, and `false` into `true`. `isLocked` holds `false`, so `!isLocked` is `true`.

The second line is `true` for a reason. The box says the thing is not locked, and so the answer to "is it not locked?" is yes.

## Booleans are not text

Put quotes around them and you've made text. `"true"` is the four letters t, r, u, e, and the checker will tell you that text can't go where a boolean is expected. Booleans don't need quotes, and they don't need a label to explain themselves, either. The value is the answer.

## Try it

- Change `isLocked` to `true`, and run the program. What does `!isLocked` show now?
- Store `false` in a new box called `hasEntered`, and print `!hasEntered`.
- Put `"true"` in quotes as the value of `isOpen`, and press **Check**. What does the checker say?

## Quiz

```quiz
What does `!true` give you?
○ true
→ Not quite. The not operator turns the answer around.
◉ false
→ Right. `!` swaps `true` and `false`.
○ 0
→ Not quite. Booleans don't become numbers, and `!true` is still a boolean.
```

```quiz
Which of these is a boolean value?
○ `"true"`
→ Not quite. The quotes make it text, which is a different kind of value.
◉ `true`
→ Right. Without quotes, `true` is the boolean value itself.
○ `1`
→ Not quite. That's a number, even though some languages use it to mean true.
```
