# Any turns the checker off

`any` is a type that accepts everything, and the checker stops checking anything that uses it. Any operation on an `any` value is allowed, including ones that would be wrong for the value's real type. `any` is sometimes a practical escape hatch, for example while migrating old JavaScript, but it removes the protection the rest of this course depends on.

> **Coming from JavaScript:** `any` has no JavaScript equivalent, because JavaScript doesn't check types at all. Node ignores the label, so the program behaves the same with or without it.

## The program

The program is already in `main.ts`:

```ts
function shout(value: any): string {
  return value.toUpperCase();
}

console.log(shout("hi"));
```

Press **Run**. You should see `HI`.

The function works, because `"hi"` is text and has `toUpperCase`. The checker accepted `value.toUpperCase()` without any proof, because `value` is `any`. It didn't check that the method exists, and it wouldn't check whether the argument was ever text.

## The mistake the checker can't see

Now imagine a caller passes a number. The checker stays silent, because it doesn't check `any` values:

```ts
console.log(shout(42));
```

Press **Check**. No error is reported, although the call is wrong. Press **Run**, and the program stops with a `TypeError`, because a number has no `toUpperCase` method. The mistake was only found at run time, which is exactly what the checker exists to prevent.

## The same code with unknown

Change the label from `any` to `unknown`, and press **Check**. Now the checker reports `value.toUpperCase()`, because it can't use a method on a value it hasn't proven to be text. The fix is to narrow the value first, as the previous step showed. That's the protection `any` gives up.

## When any is acceptable

Use `any` sparingly, and only when the checker can't yet know a type, such as during a gradual migration from JavaScript. Keep the `any` at the edge of your code, and convert it to a proper type as early as you can. Everywhere else, prefer `unknown` or a precise type.

## Try it

- Change `shout(42)` into the program, and run it. Read the error message. Which line does it name?
- Change `value: any` to `value: unknown`, and press **Check**. What does the checker report, and on which line?
- Write `const n: any = 5; console.log(n.nonsense());`, and press **Check**. Then run. What happens?

## Quiz

```quiz
Why does the checker accept `value.toUpperCase()` when `value` is `any`?
○ Because `toUpperCase` is a real method of every value.
→ Not quite. Numbers don't have `toUpperCase`, and the checker still allows the call on `any`.
◉ Because `any` turns off the checks on operations, so none of them are verified.
→ Right. An `any` value is trusted, and the checker stops verifying what's done with it.
○ Because the checker runs the function first.
→ Not quite. The checker doesn't run the program.
```

```quiz
What is the main risk of using `any` for a value that comes from outside the program?
○ The program becomes slower.
→ Not quite. The risk is correctness, not speed.
◉ A wrong type passes the checker, and the mistake appears only when the program runs.
→ Right. The checker can no longer catch mistakes on that value.
○ The value can't be printed.
→ Not quite. An `any` value prints without trouble. The risk is the mistake it hides.
```
