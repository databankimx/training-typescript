# Private state with methods

Closures can also hold several functions that share one variable. The object returned by `createAccount` has two methods, and both close over the same `balance`. Callers can deposit and read the balance, but they cannot set it directly.

> **Coming from JavaScript:** the pattern is the same in both languages. The function `createAccount` is not given a return type here, so the checker infers the object's shape from the methods. The `amount: number` and `: void` labels are the TypeScript part.

## The program

```typescript
function createAccount(opening: number) {
  let balance: number = opening;
  return {
    deposit(amount: number): void {
      balance += amount;
    },
    current(): number {
      return balance;
    },
  };
}

const account = createAccount(100);
account.deposit(50);
console.log(account.current());
```

```text
150
```

Both methods see the same `balance`, so a deposit made through one is visible through the other. The variable itself is not a property of the object, so `account.balance` does not exist, and the checker reports it.

## Why the methods are the only way in

Hiding the variable lets the account enforce its rules in one place. A later version could refuse deposits of zero or below, and no caller could bypass that rule by changing `balance` directly. This is the same reason classes keep their fields private.

## Try it yourself

- Write `console.log(account.balance);`, and press Check. What does the checker report?
- Add a `withdraw(amount: number): void` method that subtracts from `balance`, then call it and print `current()`.

## Quiz

```quiz
Why can't code outside `createAccount` change the balance directly?
○ Because numbers cannot be changed.
→ Not quite. Numbers can be changed, but only by code that can reach the variable.
◉ Because the balance is a local variable, and only the returned methods close over it.
→ Right. Code outside the function has no name for the variable, so it can reach it only through the methods.
○ Because `deposit` locks the balance.
→ Not quite. Nothing is locked. The variable is simply out of reach.
```
