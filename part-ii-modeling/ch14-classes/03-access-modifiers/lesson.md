# Access modifiers

Some properties belong inside a class. The balance of an account should change only through `deposit` and `withdraw`, where the rules are checked. If other code could set `balance` directly, a bad value could appear with no check at all. The `private` keyword stops code outside the class from reading or writing a property. The `readonly` keyword stops it being changed after the instance is built.

> **Coming from JavaScript:** `private` and `readonly` are TypeScript-only. Node ignores them, which means JavaScript itself has no such protection. Newer JavaScript has a separate `#name` syntax for truly private fields, but this course uses the TypeScript keyword.

## The program

The program is already in `main.ts`:

```ts
class Account {
  readonly owner: string;
  private balance: number;

  constructor(owner: string, balance: number) {
    this.owner = owner;
    this.balance = balance;
  }

  deposit(amount: number): void {
    this.balance = this.balance + amount;
  }

  report(): string {
    return `${this.owner}: ${this.balance}`;
  }
}

const account: Account = new Account("Ada", 100);
account.deposit(25);
console.log(account.report());
```

Press **Run**. You should see `Ada: 125`.

- **`readonly owner`** can be set in the constructor, and never changed after that. An owner doesn't change, so the class says so.
- **`private balance`** can be used anywhere inside `Account`, such as in `deposit` and `report`. Code outside the class, such as the last line of the program, can't reach it directly.
- **`report`** reads the balance for display, which is the only way outside code gets at it. The class decides what's shown.

## The rules live in the methods

Because `balance` is private, the only way to change it is through a method. That's where a rule belongs. A later version of `deposit` could refuse a negative amount, and no outside code could bypass that rule by writing to `balance` directly.

## Try it

- Write `account.balance = 1000;` below the `deposit` line, and press **Check**. What does the checker say?
- Write `account.owner = "Grace";`, and press **Check**. What does it say about the `readonly` property?
- Add a method `withdraw(amount: number): void` that subtracts the amount from `balance`. Then call it, and print `report()`.

## Quiz

```quiz
Why can't outside code write `account.balance = 1000;` when `balance` is `private`?
○ Because `balance` is not a number.
→ Not quite. The type of `balance` isn't the reason it's refused.
◉ Because a private property can be used only inside its own class.
→ Right. The checker refuses access from outside, so changes must go through methods.
○ Because the program would crash.
→ Not quite. The checker refuses the line before the program runs.
```

```quiz
What does `readonly` stop?
○ Reading the property inside the class.
→ Not quite. A readonly property can still be read.
◉ Changing the property after the instance is built.
→ Right. The constructor can set it, but nothing else can.
○ Printing the property.
→ Not quite. Printing reads the value, which `readonly` allows.
```
