# Tuples and destructuring

Sometimes a list always has the same number of items, and each position means something different. A point is an x value and a y value. A name-and-age pair is text followed by a number. A **tuple** is a list whose length and item types are fixed, and the label lists them in order. **Destructuring** takes the items out into named variables in one line.

> **Coming from JavaScript:** tuples are a TypeScript type, so they have no runtime form of their own. They're arrays, with a label that fixes their shape. Destructuring is the same in both languages.

## The program

The program is already in `main.ts`:

```ts
const point: [number, number] = [3, 4];
const [x, y] = point;

console.log(x + y);

const pair: [string, number] = ["Ada", 36];
const [name, age] = pair;

console.log(`${name} is ${age}`);
```

Press **Run**. You should see:

```
7
Ada is 36
```

The label `[number, number]` says the tuple has exactly two items, both numbers. `[string, number]` says the first is text and the second is a number. The checker holds you to those positions, so you can't put the age first.

The line `const [x, y] = point;` takes the first item and names it `x`, and the second item and names it `y`. It doesn't copy the list. It gives each position a name, which is easier to read than `point[0]` and `point[1]`.

## Where tuples fit

Use a tuple when the positions are fixed and each one has a clear meaning. Use an array when the list can grow, or when every item is the same kind of thing. A shopping basket is an array, and a single price with its currency is a tuple.

## Try it

- Change `[number, number]` to `[number, number, number]`, and press **Check**. Why does the checker object?
- Swap the order of `name` and `age` in the last destructuring line, and press **Check**. What does the checker say?
- Add a third value to `point` with a matching label, and destructure it as `z`.

## Quiz

```quiz
What does `const [x, y] = point;` do?
○ It copies the whole list into a new one.
→ Not quite. Destructuring gives each position a name, and doesn't copy the list.
◉ It names the first item `x` and the second item `y`.
→ Right. The positions in the list are given names, in order.
○ It changes the list so it has two items.
→ Not quite. The list isn't changed by destructuring.
```

```quiz
Why does the checker refuse `const pair: [string, number] = [36, "Ada"];`?
○ Because `36` is too large.
→ Not quite. The size of the number isn't the reason.
◉ Because the first item must be text, and the second must be a number.
→ Right. A tuple's label fixes the type of each position.
○ Because tuples can't hold text.
→ Not quite. A tuple can hold text, as long as the label says so.
```
