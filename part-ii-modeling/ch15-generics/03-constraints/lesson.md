# Constraints

An unconstrained type parameter could be anything, so the function can't rely on any property of it. A **constraint** narrows the choice: `T extends { id: number }` means `T` can be any type, as long as it has a numeric `id`. Inside the function, the checker then allows `item.id`, because every allowed type promises it.

> **Coming from JavaScript:** constraints are TypeScript-only, and Node ignores them. The `extends` in a constraint is not the same as the `extends` used for classes, although both mean the new type includes the old one's shape.

## The program

The program is already in `main.ts`:

```ts
function idOf<T extends { id: number }>(item: T): number {
  return item.id;
}

console.log(idOf({ id: 7, name: "Ada" }));
```

Press **Run**. You should see `7`.

The function accepts any object that has a numeric `id`. The argument here has an `id` and a `name`, and the extra `name` is allowed, because the constraint only requires `id`. The return type `number` is safe to state, because every allowed `T` promises a number in `id`.

Without the constraint, the line `item.id` would be refused. The checker would know only that `item` has some type, and it couldn't prove that the type has an `id`.

## Constraints and the checker's promise

The constraint is what lets the function use `item.id` with confidence. If a caller passes something without an `id`, the checker reports the call, not the function. That places the mistake where it was made, which is the point of a constraint.

## Try it

- Write `idOf({ name: "Grace" })`, and press **Check**. What does the checker say, and where?
- Remove the constraint so the signature reads `function idOf<T>(item: T): number`, and press **Check**. Which line is reported now?
- Add a second item to the program: `idOf({ id: 12 })`. Does the checker accept it?

## Quiz

```quiz
What does `T extends { id: number }` promise inside the function?
○ That `T` is exactly the type `{ id: number }`, with no other properties.
→ Not quite. A constraint allows any type that has at least the required properties.
◉ That every allowed `T` has a numeric `id`, so the function can use it.
→ Right. The constraint guarantees the property the function relies on.
○ That `T` is a number.
→ Not quite. `T` is an object type, and the constraint is about its `id` property.
```

```quiz
When `idOf({ name: "Grace" })` is refused, where does the checker report it?
○ Inside the function, on the line that reads `item.id`.
→ Not quite. The function is correct for every allowed type, so the problem is at the call.
◉ At the call, because the argument doesn't meet the constraint.
→ Right. The mistake is where the wrong argument was passed.
○ Nowhere, because `name` is a valid property.
→ Not quite. `name` is valid, but the argument still has no `id`.
```
