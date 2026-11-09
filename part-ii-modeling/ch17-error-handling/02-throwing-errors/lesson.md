# Throwing errors

`throw` stops the current function and sends an error up to the nearest `catch`. Use it when a function is given a value it can't work with, such as a negative age. The function doesn't guess what to do. It refuses, with a message that says what was wrong, and the caller decides how to respond.

> **Coming from JavaScript:** `throw` and `new Error(...)` are the same in both languages. The checker does not require a function to declare the errors it may throw, so the message and the `catch` are the protection.

## The program

The program is already in `main.ts`:

```ts
function setAge(age: number): number {
  if (age < 0) {
    throw new Error(`Age cannot be negative: ${age}`);
  }
  return age;
}

try {
  console.log(setAge(30));
  console.log(setAge(-5));
} catch (error: unknown) {
  if (error instanceof Error) {
    console.log(error.message);
  }
}
```

Press **Run**. You should see:

```
30
Age cannot be negative: -5
```

The first call succeeds, so `30` is printed. The second call throws, so the function stops before its `return`, and the `catch` block prints the message. The line that would have printed the second age never runs.

## Make the message useful

The message is the part a reader sees when something goes wrong, so it should say what value was refused and why. `Age cannot be negative: -5` tells the reader the rule and the input. A message such as `Invalid input` would make them search for both.

## Try it

- Change `setAge(-5)` to `setAge(200)`, and add a check that refuses ages above 150 with its own message.
- Remove the `try` and `catch`, and run. What does the program show now, and where does it stop?
- Write `throw "oops";` in place of the `throw new Error(...)` line, and run. What is printed by the `catch` block?

## Quiz

```quiz
Why does `setAge(-5)` print nothing for the `return` line?
○ Because the function returns before the check.
→ Not quite. The check runs first, and it throws before the function can return.
◉ Because `throw` stops the function, so its `return` is never reached.
→ Right. A throw leaves the function immediately, and the error goes to the caller.
○ Because negative numbers cannot be printed.
→ Not quite. Negative numbers print without trouble. The problem is the check.
```

```quiz
What makes a good error message?
○ The shortest text that fits on the screen.
→ Not quite. Brevity isn't the goal, and a short message can hide the problem.
◉ One that names the value that was refused and the rule it broke.
→ Right. The reader can see what went wrong, and what the rule is, at a glance.
○ A generic message, so it works for every error.
→ Not quite. A generic message makes the reader search for the cause.
```
