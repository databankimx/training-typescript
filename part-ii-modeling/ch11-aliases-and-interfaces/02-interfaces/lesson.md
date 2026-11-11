# Interfaces

An **interface** describes the shape of an object, the same job a type alias can do for an object. Its main advantage is that one interface can **extend** another. A VIP customer is a customer with extra properties, and the interface says exactly that, without repeating the customer's properties.

> **Coming from JavaScript:** interfaces are a TypeScript-only feature. Node ignores them entirely, so the program runs the same whether or not the interface is written.

## The program

The program is already in `main.ts`:

```ts
interface Customer {
  name: string;
  city: string;
}

interface VipCustomer extends Customer {
  points: number;
}

const vip: VipCustomer = { name: "Ada", city: "Dallas", points: 500 };

console.log(`${vip.name} has ${vip.points} points`);
```

Press **Run**. You should see `Ada has 500 points`.

Here is what the interfaces say:

- **`interface Customer`** lists the properties every customer has: a name and a city.
- **`interface VipCustomer extends Customer`** starts with everything in `Customer`, and adds `points`. A VIP has all the properties of a customer, plus one more.
- **`const vip: VipCustomer`** must therefore have a name, a city, and points. Leaving out any of them is a mistake the checker reports.

## Interfaces and extension

Extension keeps the shapes in step. If a customer later needs a phone number, you add it to `Customer`, and every interface that extends it gets the new property too. You don't need to change `VipCustomer`.

## Try it

- Remove `points: 500` from `vip`, and press **Check**. What does the checker say?
- Add `email: string;` to `Customer`, and press **Check**. Which lines are reported now?
- Write `interface Employee extends Customer { staffId: number; }`, and create an employee with a name, a city, and a staff ID.

## Quiz

```quiz
What does `interface VipCustomer extends Customer` give `VipCustomer`?
○ Only the properties that `VipCustomer` adds itself.
→ Not quite. Extension keeps the properties of `Customer` as well.
◉ Every property of `Customer`, plus the ones `VipCustomer` adds.
→ Right. Extension includes everything from the base interface, and then adds to it.
○ Nothing, because `extends` only copies the name.
→ Not quite. Extension copies the shape, not only the name.
```

```quiz
Which is true of interfaces, compared with the rest of the program?
○ Node checks interfaces when it runs the program.
→ Not quite. Node ignores interfaces. The checker is the only tool that reads them.
◉ They exist only for the checker, and the program runs the same without them.
→ Right. Interfaces are for the checker, so they don't change the output.
○ They can only describe text values.
→ Not quite. An interface can describe objects of any shape.
```
