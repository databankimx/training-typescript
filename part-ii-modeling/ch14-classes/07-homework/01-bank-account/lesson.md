# Homework: bank account

A bank keeps each customer's balance inside an account class, so no other part of the program can change it except through the account's own rules. The exercise builds that class: a private balance, a deposit, a withdrawal, and a way to read the result.

> **Coming from JavaScript:** classes and methods work the same way in both languages. The `private` keyword and the `: number` labels are the TypeScript part.

## The task

Here is the starting code, which prints a balance:

```ts
const balance: number = 100;

console.log(balance);
```

Start from the code above, in your own file. Write a class `Account` with a constructor that takes a starting balance, and a `private` balance property. Add `deposit` and `withdraw` methods that change the balance by an amount. Add a `report` method that returns the balance. Create an account with a starting balance of `100`, deposit `50`, withdraw `30`, and print the balance from `report`. The output should be:

```
120
```

## Hints

- The constructor sets `this.balance` from the value it is given.
- `report` returns `this.balance`, so the rest of the program can read it without changing it.

## When you're stuck

Show the solution. It's a spoiler, so give it a proper attempt in your own file first.

## Quiz

```quiz
Why keep `balance` private, and read it through `report`?
○ Because private properties run faster.
→ Not quite. The reason is control over changes, not speed.
◉ So the rules for changing the balance stay in the class, where they can be checked.
→ Right. Outside code can read the balance, but it can change it only through the class's methods.
○ Because `report` is required by the checker.
→ Not quite. The checker doesn't require any method. The reason is protecting the balance.
```
