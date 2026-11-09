# Narrowing with typeof

**Narrowing** is how the checker learns which type a value has at a particular point in the code. A check such as `typeof value === "number"` tells it that, inside the matching block, `value` is a number. Outside that block, and after the check has returned, the checker knows the rest of the union is left. Each check narrows the type a little further.

> **Coming from JavaScript:** `typeof` works the same way in both languages. The narrowing that follows it is the TypeScript part, and it exists only for the checker.

## The program

The program is already in `main.ts`:

```ts
function describe(value: string | number): string {
  if (typeof value === "number") {
    return `number, doubled: ${value * 2}`;
  }
  return `text, shouted: ${value.toUpperCase()}`;
}

console.log(describe(21));
console.log(describe("hi"));
```

Press **Run**. You should see:

```
number, doubled: 42
text, shouted: HI
```

Follow the checker through the function:

1. Inside the `if`, `typeof value === "number"` narrows `value` to a `number`. Multiplying by two is allowed.
2. The `if` returns, so everything after it runs only when `value` is not a number. That leaves `string`. Calling `toUpperCase` is allowed, because only text has that method.

Notice that the second `return` has no check of its own. The narrowing from the `if` carries forward, because the first branch always leaves the function.

## What happens without narrowing

If the function used `value.toUpperCase()` before the check, the checker would report it, because a number has no `toUpperCase`. The check is what makes the method available. A union doesn't permit an operation until the checker knows the type is right.

## Try it

- Change `value * 2` to `value + 1`. Does the output change?
- Put `value.toUpperCase()` on the line before the `if`, and press **Check**. What does the checker report?
- Add a third case: `if (typeof value === "boolean")`, returning a message about the boolean. Then update the union to include `boolean`.

## Quiz

```quiz
Inside the block `if (typeof value === "number") { ... }`, what type does the checker give `value`?
○ `string | number`
→ Not quite. Inside the block the check has already narrowed it, so the union is smaller.
◉ `number`
→ Right. The check narrows `value` to a number, so number operations are allowed.
○ `any`
→ Not quite. The checker knows the type exactly here, which is the point of narrowing.
```

```quiz
Why does `value.toUpperCase()` work after the `if` returns, but not before it?
○ Because the checker runs the `if` first, and deletes the number case.
→ Not quite. The checker doesn't run or change the program.
◉ Because the `if` has returned for numbers, so the remaining value must be text.
→ Right. Once the number case has returned, the checker knows the value is a string at that point.
○ Because `toUpperCase` only works after a `return`.
→ Not quite. The method is allowed because the type has been narrowed to text.
```
