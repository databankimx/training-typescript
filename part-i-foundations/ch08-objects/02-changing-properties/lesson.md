# Changing properties

Objects aren't fixed once they're made. You can change a property's value at any time, and the object keeps the same identity while its contents change. That's the source of a common surprise, which this step addresses.

> **Coming from JavaScript:** changing a property is the same in both languages. The checker enforces the shape you described in the label.

## The program

The program is already in `main.ts`:

```ts
const customer: { name: string; city: string; age: number } = {
  name: "Ada",
  city: "Dallas",
  age: 36,
};

customer.city = "Austin";
customer.age = customer.age + 1;

console.log(`${customer.name} lives in ${customer.city}, age ${customer.age}`);
```

Press **Run**. You should see:

```
Ada lives in Austin, age 37
```

Two things happen here:

- **`customer.city = "Austin";`** replaces the value of the `city` property. The line uses an equals sign to store the new value, the same as with a variable.
- **`customer.age = customer.age + 1;`** reads the current age, adds one, and stores the result. The right-hand side is worked out first, then the answer is stored.

## A constant object can still change

The object was created with `const`, and you might expect that to stop it changing. It doesn't. `const` stops the name `customer` from being pointed at a different object. The object itself can still be changed, because its contents live inside it, not in the name.

This surprises almost everyone the first time. If you need the object to stay the same, make a copy before changing it, or use a type that marks the properties as read-only. Chapter 15 covers read-only types.

## Adding a property

You can add a property that the object doesn't yet have, but only if the type allows it. The label in this program lists three properties, so adding a fourth is a mistake the checker reports. The homework covers how to add a property the right way, by changing the label too.

## Try it

- Change `customer.city` back to `"Dallas"`, and run. Does the output change?
- Write `const copy = customer;`, change `copy.name` to `"Grace"`, and print `customer.name`. Why has it changed?
- Write `customer.zip = "75201";` below the object, and press **Check**. What does the checker report?

## Quiz

```quiz
What does `const` stop from changing, when it's used with an object?
○ The object's properties.
→ Not quite. The object's properties can still change, because they live inside it.
◉ The name from being pointed at a different object.
→ Right. The name always refers to the same object, but the object's contents can still change.
○ The object's type.
→ Not quite. The type is set by the label, and `const` doesn't change it.
```

```quiz
In `customer.age = customer.age + 1;`, which part is worked out first?
○ The left side, `customer.age`.
→ Not quite. The right side is worked out first, and the result is stored on the left.
◉ The right side, which reads the current age and adds one.
→ Right. The program works out the right side, then stores the answer in the property.
○ Neither. The line is skipped.
→ Not quite. The line runs, and both sides are used.
```
