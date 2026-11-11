# Homework: shape declaration

A drawing tool stores each rectangle as a plain object, and its shape is described in a declaration file, `shape.d.ts`, which the team shares. The exercise uses that declared type, imported with `import type`, to label a rectangle and calculate its area.

> **Coming from JavaScript:** the area is a multiplication, the same in both languages. The declaration file and the `import type` line are the TypeScript part.

## The task

The folder contains `shape.d.ts`, which declares the `Rectangle` interface with a `width` and a `height`. Here is the starting code, which sets the two sides as separate values:

```ts
const width: number = 3;
const height: number = 4;

console.log(`Area: ${width}`);
```

Start from the code above, in your own file. Import the type `Rectangle` from `./shape.js` with `import type`. Create a rectangle with a width of `3` and a height of `4`, labelled as a `Rectangle`. Print its area, with the label `Area:`. The output should be:

```
Area: 12
```

## Hints

- The import is `import type`, because `Rectangle` is an interface and has no code.
- The area is the width multiplied by the height.

## When you're stuck

Show the solution. It's a spoiler, so give it a proper attempt in your own file first.

## Quiz

```quiz
Why does the rectangle use `Rectangle` as its label, instead of an unlabelled object?
○ Because unlabelled objects cannot have a width.
→ Not quite. They can. The label is about what the checker checks.
◉ So the checker holds the object to the shared shape, and reports a missing or misnamed side.
→ Right. The declared type is the team's agreed shape, and the label enforces it.
○ Because `Rectangle` makes the program faster.
→ Not quite. The label is about checking, not speed.
```
