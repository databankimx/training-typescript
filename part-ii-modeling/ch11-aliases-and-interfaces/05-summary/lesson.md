## Summary: Aliases and interfaces

Naming a shape once means every value that uses it is checked the same way. Here is what each tool contributes.

* **A type alias names any type.** `type Point = { x: number; y: number }` names an object shape, and `type Price = number` names a plain type.
* **An interface names an object shape and can be extended.** `interface VipCustomer extends Customer` keeps the two shapes in step.
* **Use an interface for objects that others extend, and an alias for everything else.** Either works for a simple object.
* **A question mark makes a property optional.** The object may leave it out.
* **`readonly` stops a property being changed after creation.** It suits identifiers.

### Check your understanding

*These questions are written for this course.*

```quiz
Which declaration gives the name `Order` to an object with an `id` and a `total`?
○ `type Order = number;`
→ Not quite. That names a plain number, not an object with properties.
◉ `interface Order { id: number; total: number; }`
→ Right. The interface names an object shape with both properties.
○ `const Order = { id: 1, total: 2 };`
→ Not quite. That creates a value, not a shape that other values can use.
```

```quiz
What does `readonly` stop?
○ Reading the property.
→ Not quite. A read-only property can still be read.
◉ Changing the property after the object is created.
→ Right. The property can be set once, when the object is made.
○ Printing the property.
→ Not quite. Printing is reading, which `readonly` allows.
```

```quiz
What is the result of an object that leaves out a property marked `discount?`?
○ The checker reports it as an error.
→ Not quite. The question mark makes the property optional, so it's allowed to be missing.
◉ The property is allowed to be missing, and reading it gives `undefined`.
→ Right. An optional property may be absent, so reading it gives `undefined`.
○ The object is given a discount of `0`.
→ Not quite. The checker doesn't set values. Missing optional properties stay missing.
```
