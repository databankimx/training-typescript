# Methods and state

A **method** is a function that belongs to a class. It can read and change the instance's properties, and that's where the rules about an object belong. When `account.deposit(50)` runs, the method's `this` is that account, so the balance it changes is the one belonging to this account, and no other.

> **Coming from JavaScript:** methods and `this` are the same in both languages. The `: void` label on each method is the TypeScript part.

## The program

The program is already in `main.ts`:

```ts
class Account {
  owner: string;
  balance: number;

  constructor(owner: string, balance: number) {
    this.owner = owner;
    this.balance = balance;
  }

  deposit(amount: number): void {
    this.balance = this.balance + amount;
  }

  withdraw(amount: number): void {
    this.balance = this.balance - amount;
  }
}

const account: Account = new Account("Ada", 100);
account.deposit(50);
account.withdraw(30);

console.log(account.balance);
```

Press **Run**. You should see `120`: the starting balance of 100, plus 50, minus 30.

The two methods change the balance, and return nothing. Each one is labelled `: void`, which means the caller gets no value back, only the change to the object. The calls are made with the dot, the same as reading a property: `account.deposit(50)`.

## Each instance has its own state

Create a second account, and deposit into it. The first account's balance doesn't change. The state belongs to the instance, and the methods work on whichever instance they're called on. That's why one blueprint can describe many accounts, each with its own balance.

## Try it

- Add `account.deposit(10);` after the withdrawal, and run. What's printed?
- Create `const other: Account = new Account("Grace", 0);`, deposit 20 into `other`, and print `account.balance` again. Has it changed?
- Write `account.withdraw("30");`, and press **Check**. What does the checker report?

## Quiz

```quiz
What does `account.deposit(50)` change?
○ Every account created from the `Account` class.
→ Not quite. A method changes the instance it is called on, and no other.
◉ The balance of that one account.
→ Right. The method's `this` is the account it was called on, so only that balance changes.
○ Nothing, because the method returns `void`.
→ Not quite. `void` means no value is returned, but the method still changes the object.
```

```quiz
Why is `: void` written after the parameter list of `deposit`?
○ Because methods must always return text.
→ Not quite. Methods can return any type, or none.
◉ To say the method returns no value, and changes the object instead.
→ Right. The label promises the caller that there is no result to store.
○ Because the amount must be a whole number.
→ Not quite. That's the label on the parameter. The `void` label is about the result.
```
