# Scope

Every name in a program is visible in some parts of the code and not in others. That region is its **scope**. A name created inside a function belongs to that function, and a name created at the top of the file can be read by every function below it. Scope keeps the names inside a function from clashing with names outside it.

> **Coming from JavaScript:** scope works the same way in both languages. The `number` labels on the values are the TypeScript part.

## The program

The program is already in `main.ts`:

```ts
const rate: number = 0.25;

function withTax(price: number): number {
  const tax: number = price * rate;
  return price + tax;
}

console.log(withTax(50));
```

Press **Run**. You should see `62.5`, which is `50` plus a quarter of `50`.

Two different scopes are in use here:

- **`rate`** is created at the top of the file. Any function below it can read it, so `withTax` uses it.
- **`tax`** is created inside `withTax`. It exists only while the function runs, and only inside its braces.

The parameter `price` is inside the function too, for the same reason as the `name` parameter in the first step.

## What a function can't see

Code outside the function can't read `tax`. If you add `console.log(tax);` below the program, the checker reports that `tax` isn't defined in that place. That's the protection scope gives you: a name used inside one function can't be changed or relied on by another by accident.

Choose names that describe their scope. A short name inside a small function is fine. A name at the top of a file is read by the whole program, so it should say what it is clearly.

## Try it

- Change `rate` to `0.1`, and run. What's printed?
- Add `console.log(tax);` at the bottom, and press **Check**. What does the checker report?
- Move `const rate` inside `withTax`, and press **Check**. What does the checker report about the line that prints `withTax(50)`?

## Quiz

```quiz
Which names can the function `withTax` read, in the program above?
○ Only `price`.
→ Not quite. `withTax` can also read `rate`, which was created at the top of the file.
◉ `price`, `tax`, and `rate`.
→ Right. The parameter, the name inside the function, and the name at the top of the file are all visible to it.
○ Only `tax`.
→ Not quite. `tax` is inside the function, but `price` and `rate` are visible too.
```

```quiz
Why would a name created inside a function be a problem if it were visible everywhere?
○ Because the checker stops programs with many names.
→ Not quite. The number of names isn't the issue.
◉ Because another function could change or rely on it by accident, with the same name.
→ Right. Scope stops names inside one function from clashing with names elsewhere.
○ Because names can't be used more than once.
→ Not quite. Names can be reused in different scopes, which is the point of scope.
```
