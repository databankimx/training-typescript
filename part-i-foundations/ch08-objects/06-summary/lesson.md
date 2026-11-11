## Summary: Objects

An object groups related values under names. Its type describes which names it has, and that description is what the checker holds to.

* **An object is a set of named properties.** Read one with a dot, or with brackets when the name is in a variable.
* **Changing a property doesn't need a new object.** A `const` object's contents can change. Only the name is fixed.
* **A fixed shape lists its names, and the checker enforces them.** Use it when the properties are known.
* **A record maps any text names to values of one type.** `Record<string, number>` allows any names, as long as each value is a number.
* **Objects can be nested.** Read deep values one dot at a time, and use `?.` where a level might be missing.
* **`Object.keys` and `Object.values` list an object's contents.** Loop over the names to visit each entry.

### Check your understanding

*These questions are written for this course.*

```quiz
Which type describes an object whose names come from data, and whose values are all numbers?
○ `{ name: string; age: number }`
→ Not quite. That's a fixed shape, which lists its names in advance.
◉ `Record<string, number>`
→ Right. A record allows any text names, with number values.
○ `number[]`
→ Not quite. A list has positions, not names.
```

```quiz
After `const customer = { name: "Ada" };`, which line is allowed by a fixed shape that lists only `name`?
○ `customer.age = 36;`
→ Not quite. The fixed shape doesn't include `age`, so the checker refuses it.
◉ `customer.name = "Grace";`
→ Right. The property exists in the shape, so changing its value is allowed.
○ `customer.name = 42;`
→ Not quite. The value must still be text, which the label promises.
```

```quiz
What does `Object.values(scores)` give you, if `scores` is `{ maths: 90, art: 75 }`?
○ `["maths", "art"]`
→ Not quite. Those are the names. `values` gives the values.
◉ `[90, 75]`
→ Right. `values` gives the values in a list, in the same order as the names.
○ `{ maths: 90, art: 75 }`
→ Not quite. That's the object itself. `values` gives just the values, as a list.
```
