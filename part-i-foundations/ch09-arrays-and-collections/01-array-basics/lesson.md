# Array basics

An **array** is an ordered list of values. Each value has a position, which starts at `0`, and the array knows how many values it holds. You've already used arrays without naming them, in the `split` step and the `for...of` loops. This step looks at them directly.

> **Coming from JavaScript:** arrays are the same in both languages. The `string[]` label says every item is text, and it's the TypeScript part.

## The program

The program is already in `main.ts`:

```ts
const cities: string[] = ["Dallas", "Austin"];

cities.push("Houston");

console.log(cities[0]);
console.log(cities.length);
```

Press **Run**. You should see:

```
Dallas
3
```

Here's what each line does:

- **`["Dallas", "Austin"]`** creates the list with two items, separated by commas and enclosed in square brackets.
- **`cities.push("Houston")`** adds an item to the end of the list. `push` is a method, the same kind of action as `trim` in the text chapter.
- **`cities[0]`** reads the item at position `0`, which is the first item.
- **`cities.length`** counts the items, which is now `3`.

## Positions start at zero

The first item is at position `0`, not `1`. The last item is at position `length - 1`. So a list of three items has positions `0`, `1`, and `2`. Reading a position that doesn't exist gives `undefined`, which is the missing-value case from the earlier chapter.

## The label

`string[]` says the list holds text. If you push a number, the checker reports it, because the list's promise is that every item is text. The label is what keeps a list consistent, and it's worth writing for any list you create.

## Try it

- Read `cities[2]`, then `cities[3]`. What does each one show?
- Push `42` onto `cities`, and press **Check**. What does the checker say?
- Change `cities[0]` to `cities[cities.length - 1]`. Which city is printed?

## Quiz

```quiz
What is the position of the first item in an array?
○ `1`
→ Not quite. Positions start at `0`, as they did in the text chapter.
◉ `0`
→ Right. The first item is at position zero, and the last is at `length - 1`.
○ `length`
→ Not quite. `length` is the number of items, not a position.
```

```quiz
What does `cities.push("Houston")` do?
○ It removes the last item.
→ Not quite. `push` adds items. It doesn't remove them.
◉ It adds `"Houston"` to the end of the list.
→ Right. `push` adds an item after the last one.
○ It sorts the list alphabetically.
→ Not quite. `push` only adds to the end, and doesn't change the order of the others.
```
