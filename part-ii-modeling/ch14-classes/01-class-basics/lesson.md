# Class basics

A class describes what an object looks like and what it's made of. The class is the blueprint, and each object made from it is an **instance**. The `new` keyword builds an instance, and the `constructor` sets its starting values.

> **Coming from JavaScript:** classes are the same in both languages. The property labels, such as `owner: string`, are the TypeScript part.

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
}

const account: Account = new Account("Ada", 100);
console.log(`${account.owner} has ${account.balance}`);
```

Press **Run**. You should see `Ada has 100`.

Here's what each part does:

- **`class Account`** introduces the blueprint.
- **`owner: string` and `balance: number`** declare the properties every account has, with their types. A declaration reserves the property, and the checker requires that each account has both.
- **`constructor`** runs once, when `new` builds an instance. It takes the starting values and stores them.
- **`this`** refers to the instance being built. `this.owner = owner` stores the value passed in as the owner of this particular account.
- **`new Account("Ada", 100)`** creates an instance, and the variable `account` holds it.

## Why the properties are written out

You might expect a shorter form, where the constructor's parameters are declared as properties, such as `constructor(private owner: string)`. The course's settings reject that form. It isn't just a stylistic rule: Node runs the program by removing the type labels, and that shorthand needs more than removing labels. Writing each property and assigning it in the constructor works with both the course's settings and Node.

## Try it

- Create a second account, `new Account("Grace", 250)`, and print its owner and balance.
- Write `account.balance = "lots";`, and press **Check**. What does the checker report?
- Write `const empty = new Account("Linus");`, and press **Check**. Why is that reported?

## Quiz

```quiz
What does `new Account("Ada", 100)` create?
○ A second copy of the class.
→ Not quite. `new` builds one instance from the class, and the class itself is unchanged.
◉ An instance, with the owner and balance set by the constructor.
→ Right. The constructor runs once, and stores the starting values in the new instance.
○ A function called `Account`.
→ Not quite. The class is not a function you call on its own. `new` builds an instance from it.
```

```quiz
In `this.owner = owner;` inside the constructor, what does `this` refer to?
○ The class `Account`.
→ Not quite. `this` refers to the instance being built, not the class.
◉ The instance being built, so the value is stored on that account.
→ Right. `this` lets the constructor set properties on the object it is creating.
○ The text `"owner"`.
→ Not quite. `this` is not text. It refers to the object.
```
