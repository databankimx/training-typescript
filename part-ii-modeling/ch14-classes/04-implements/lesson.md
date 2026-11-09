# Implementing an interface

An interface says what a value can do. A class that **implements** an interface promises to provide every method the interface lists. The checker checks the promise when the class is written, so a missing method is reported where the class is, not later where it's used. This lets the program treat different classes the same way, as long as each one keeps the promise.

> **Coming from JavaScript:** `implements` is TypeScript-only, and Node ignores it. The interface is a checker-only contract, just as it was in the interfaces chapter.

## The program

The program is already in `main.ts`:

```ts
interface Shape {
  area(): number;
}

class Square implements Shape {
  side: number;

  constructor(side: number) {
    this.side = side;
  }

  area(): number {
    return this.side * this.side;
  }
}

const shapes: Shape[] = [new Square(3), new Square(4)];

for (const shape of shapes) {
  console.log(shape.area());
}
```

Press **Run**. You should see `9` and then `16`.

- **`interface Shape`** lists the methods a shape must have. Here, only `area`.
- **`class Square implements Shape`** promises to provide `area`. Its `area` method returns the side times itself.
- **`const shapes: Shape[]`** is a list whose items are described only by the interface. The list holds two squares, but the loop doesn't need to know that.
- **The loop** calls `shape.area()` on each item, and each call gets the right answer for its square.

## Why the interface helps

The loop depends on `Shape`, not on `Square`. A circle or a triangle could be added later, with its own `area` method and an `implements Shape`, and the loop would work without any change. The interface is what the rest of the program relies on.

## Try it

- Add a method `perimeter(): number` to `Shape`, and press **Check**. Which line does the checker report?
- Write `class Circle implements Shape { }` with no `area` method, and press **Check**. What does the checker say, and where?
- Add `new Square(5)` to the `shapes` list, and run. How many lines are printed?

## Quiz

```quiz
What does `class Square implements Shape` promise?
○ That the class extends the interface.
→ Not quite. `implements` doesn't extend. It promises to provide the methods the interface lists.
◉ That the class provides every method the interface lists.
→ Right. The checker verifies the promise when the class is written.
○ That the class can be called as a function.
→ Not quite. Interfaces describe methods and properties, not calls.
```

```quiz
Why does the `for` loop over `shapes` not need to know which class each item is?
○ Because every item is a `Square`.
→ Not quite. The loop is written against `Shape`, so it works for any class that implements it.
◉ Because the loop depends on the interface, which every item promises to provide.
→ Right. The loop uses only the methods the interface guarantees.
○ Because the loop checks each item's class at run time.
→ Not quite. The guarantee comes from the checker and the interface, not from checks in the loop.
```
