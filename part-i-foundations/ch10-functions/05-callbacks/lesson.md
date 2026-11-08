# Callbacks

A function is a value like any other. You can store it in a variable, and you can pass it to another function, which then calls it. A function passed in this way is called a **callback**. The array methods from the arrays chapter all work this way: `filter` is given a rule, and it calls that rule once for each item.

> **Coming from JavaScript:** callbacks are the same in both languages. The `(n: number) => number` label describes the shape of the function you must pass in.

## The program

The program is already in `main.ts`:

```ts
function applyTwice(value: number, step: (n: number) => number): number {
  return step(step(value));
}

const addThree = (n: number): number => n + 3;

console.log(applyTwice(10, addThree));

const names: string[] = ["Ada", "Grace"];
names.forEach((name: string) => console.log(`Hi ${name}`));
```

Press **Run**. You should see:

```
16
Hi Ada
Hi Grace
```

Here is what happens:

- **`step: (n: number) => number`** is a parameter whose value is a function. The label says the function takes a number and gives back a number. Any function with that shape can be passed in.
- **`applyTwice(10, addThree)`** passes `addThree` as the step. The function calls it twice, so `10` becomes `13`, and then `16`.
- **`names.forEach(...)`** calls the arrow function once for each name, and prints a greeting.

`forEach` is the callback version of a loop. It's useful when each item needs an action, and no new list is needed.

## Passing a function, not calling it

Notice that `addThree` is written without brackets when it's passed in. Writing `addThree(10)` would call it straight away and pass the result, which is a number, not a function. The brackets belong to the place where the function is run.

## Try it

- Change `applyTwice` to call `step` three times, and check the output.
- Write `const double = (n: number): number => n * 2;`, and pass it to `applyTwice` with `10`. What's printed?
- Change `names.forEach` to `names.map`, and print the result. What does the program show, and why is the result different?

## Quiz

```quiz
What does `applyTwice(10, addThree)` do with `addThree`?
○ It calls `addThree` with the number `10` and passes on its result.
→ Not quite. That's what you'd get from writing `addThree(10)`. Here the function itself is passed.
◉ It passes `addThree` as a value, and `applyTwice` calls it.
→ Right. The function is handed over, and the other function runs it.
○ It stores `addThree` as text.
→ Not quite. A function is a value, not text, and it's passed as the function itself.
```

```quiz
Why is `addThree` written without brackets in `applyTwice(10, addThree)`?
○ Because brackets are not allowed in function calls.
→ Not quite. Brackets are needed to call a function, just not here.
◉ Because the brackets would call the function, and the result would be passed instead.
→ Right. Without brackets, the function itself is passed, so the other function can call it.
○ Because `addThree` is a number.
→ Not quite. It's a function, so it's written without brackets only when it's passed in.
```
