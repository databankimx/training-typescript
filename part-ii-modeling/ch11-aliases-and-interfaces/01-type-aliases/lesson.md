# Type aliases

A **type alias** gives a type a name. You write `type Point = ...` once, and then use `Point` anywhere a point is needed, instead of repeating the full shape. The name says what the value is, and the shape says what it contains.

> **Coming from JavaScript:** JavaScript has no type aliases, because it has no types. Node ignores the `type` line when the program runs, and the checker uses it to check every value labelled `Point`.

## The program

The program is already in `main.ts`:

```ts
type Point = { x: number; y: number };

const origin: Point = { x: 0, y: 0 };
const target: Point = { x: 3, y: 4 };

const distanceSquared: number = (target.x - origin.x) ** 2 + (target.y - origin.y) ** 2;
console.log(distanceSquared);
```

Press **Run**. You should see `25`. The distance between the two points, squared, is `3` squared plus `4` squared.

- **`type Point = { x: number; y: number };`** creates the alias. It doesn't create a value. It just gives the shape a name.
- **`const origin: Point`** uses the name in a label. Both `origin` and `target` must have an `x` and a `y`, each a number.
- **`**`** is the exponent operator. `(target.x - origin.x) ** 2` squares the horizontal distance.

## Why a name helps

Without the alias, every point in the program would repeat `{ x: number; y: number }`. If you later decided a point also needed a `z` value, you'd have to find every copy. With the alias, you change the shape in one place, and the checker reports any value that no longer fits.

## Try it

- Add a third point, `const middle: Point = { x: 1, y: 2 };`, and check that it's accepted.
- Write `const bad: Point = { x: 1 };`, and press **Check**. What does the checker say?
- Add `z: number` to the alias, and press **Check**. Which lines does the checker now report, and why?

## Quiz

```quiz
What does `type Point = { x: number; y: number };` create?
○ A value called `Point`.
→ Not quite. An alias names a type. It doesn't create a value.
◉ A name for the shape, which later labels can use.
→ Right. `Point` is now a name for an object with an `x` and a `y`, both numbers.
○ A function that returns a point.
→ Not quite. A function would need parentheses and a body. An alias is only a name for a shape.
```

```quiz
Why is a type alias useful when the same shape appears many times?
○ Because the program runs faster.
→ Not quite. The alias doesn't change how the program runs.
◉ Because the shape can be changed in one place, and every label that uses it is checked.
→ Right. One change to the alias updates the checking everywhere the name is used.
○ Because the alias removes the need for labels.
→ Not quite. The alias is a label, so it still checks the values.
```
