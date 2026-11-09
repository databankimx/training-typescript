# Homework: shape total

A drawing program holds a mix of shapes, and it needs the total area of all of them. It doesn't care which shape is which: it only needs each one to promise an `area` method. The exercise uses one interface for two different classes, and totals them through the interface.

> **Coming from JavaScript:** classes, methods, and loops work the same way in both languages. The `implements` clause and the `Shape[]` label are the TypeScript part.

## The task

Here is the starting code, which prints how many sides are in the list:

```ts
const sides: number[] = [3, 4];

console.log(sides.length);
```

Start from the code above, in your own file. Write an interface `Shape` with an `area` method that returns a number. Write a `Square` class with one side, and a `Rectangle` class with a width and a height. Both should implement `Shape`. Put a `Square` with side `3` and a `Rectangle` with width `2` and height `5` in a list of shapes, and print the total of their areas. The output should be:

```
19
```

## Hints

- A square's area is its side times itself. A rectangle's area is its width times its height.
- Loop over the list, and add each shape's `area()` to a total that starts at zero.

## When you're stuck

Show the solution. It's a spoiler, so give it a proper attempt in your own file first.

## Quiz

```quiz
Why can the loop call `shape.area()` on both a `Square` and a `Rectangle`?
○ Because both classes extend the same base class.
→ Not quite. They implement the interface, not a base class.
◉ Because both classes implement `Shape`, so each one promises an `area` method.
→ Right. The list is typed as `Shape[]`, so the loop uses only what the interface guarantees.
○ Because the checker allows any method to be called on any object.
→ Not quite. The checker allows only the methods the type promises.
```
