# Letting TypeScript infer the type

You don't have to label everything. The checker is quite capable of working out what a box holds from what you put in it, which is more than can be said for the boxes in most people's kitchens. This step shows where that works, and where you still need to help.

> **Coming from JavaScript:** `const` and `let` are the same as in JavaScript. Only the checker's view of the values is new.

## What is a variable?

A **variable** is a named box that holds a value. You make one with `const` or `let`, and you give it a name:

- **`const`** makes a box whose value can't be changed after it's set.
- **`let`** makes a box whose value can be changed later.

## The program

The program is already in `main.ts`:

```ts
const count = 3;
let label = "items";

console.log(`${count} ${label}`);
```

Press **Run**. You should see `3 items`.

Notice that neither line has a label saying what kind of value it holds. You didn't write `: number` or `: string`, and the checker still knows. It works the type out from the value you put in the box. This is called **inference**. The checker infers that `count` holds a number because it was set to `3`.

## Where inference stops

Inference follows the value you started with. A `let` box keeps the kind of value it was given when it was made. Add this line to the end of `main.ts`:

```ts
label = count;
```

Press **Check**. The checker reports that a number can't be put into `label`, because `label` was made to hold text. Press **Run**. Node still prints `3 3`, because Node doesn't check the kind of value.

Delete the line, and press **Check** again.

## When to write a type yourself

You don't need a label on every box. Two places are worth writing one:

- **Function inputs.** The checker can't work out what kind of value a function should receive, so you write it. The last step showed this.
- **An empty list.** A list with nothing in it, such as `let items = [];`, has no value to learn from. Writing `let items: string[] = [];` tells the checker what the list is for.

## Try it

- Change `label` to `let label = 7;`, and press **Check**. Then fix the `console.log` line so the text still makes sense.
- Add the function `function price(amount) { return amount * 2; }`, and press **Check**. Then write `: number` after `amount` and check again.

## Quiz

```quiz
Why doesn't `const count = 3;` need a label saying `number`?
○ Because constants can't be checked.
→ Not quite. A constant has a kind of value, and the checker knows what it is.
◉ The checker works out `number` from the value `3`.
→ Right. The type comes from the value, so writing it out would repeat what's already there.
○ Node adds the label when the program runs.
→ Not quite. Node doesn't add or check labels.
```

```quiz
What does `let items = [];` leave the checker unable to know?
○ Whether `items` is a list.
→ Not quite. The square brackets tell the checker that it's a list.
◉ What kind of values the list will hold.
→ Right. An empty list has nothing in it yet, so the checker needs a label such as `string[]`.
○ How many items the list will hold.
→ Not quite. The length changes as items are added, so the checker doesn't track it.
```
