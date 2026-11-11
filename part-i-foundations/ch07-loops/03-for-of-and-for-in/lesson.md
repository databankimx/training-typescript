# For...of and for...in

Most of the time you don't want a counter at all. You want each item in a list, or each entry in an object, one after another. `for...of` and `for...in` do that without any counting, and they're the loops you'll reach for first.

> **Coming from JavaScript:** `for...of` and `for...in` are the same in both languages. The `Record<string, number>` label is the TypeScript part, and Chapter 8 covers objects in detail.

## Each item in a list

`for...of` gives you each item in a list, in order:

```ts
const cities: string[] = ["Dallas", "Austin", "Houston"];

for (const city of cities) {
  console.log(city);
}
```

The variable after `const` takes each item in turn. You don't need an index, and you can't make the mistake of going one past the end.

## Each name in an object

`for...in` gives you each name, or key, in an object. The object in the example needs a label, and the label uses a word you haven't met yet, so it's worth stopping to explain it.

> **New term: record.** A `Record` is a label for an object that holds named values. `Record<string, number>` reads as: names are text (`string`), and each value is a number. Here, `apples` is the name and `3` is the value. The label is only there to tell the checker and the next reader what the object holds. Chapter 8 covers objects, and the record label, in full.

```ts
const stock: Record<string, number> = { apples: 3, pears: 0 };

for (const item in stock) {
  console.log(`${item}: ${stock[item]}`);
}
```

`item` takes the name of each entry, such as `apples`, and `stock[item]` looks up its value. You don't need to understand `Record` to use `for...in`. You only need to know what the label promises.

Use `for...of` for lists, and `for...in` for the keys of an object. Using `for...in` on a list is a common mistake, because it gives you the positions as text rather than the items themselves.

## Press Run

The program is already in `main.ts`. You should see:

```
Dallas
Austin
Houston
apples: 3
pears: 0
```

## Try it

- Add a fourth city to the list, and check that the loop prints it without any other change.
- Add a third fruit to `stock`, and check that the second loop prints it.
- Change `for (const city of cities)` to `for (const city in cities)`, and run. What's printed, and why?

## Quiz

```quiz
Which loop gives you each item of a list, without counting?
○ `for (let i: number = 0; ...)`
→ Not quite. That's a counted loop. It works, but it's the wrong tool when you only want the items.
◉ `for (const item of list)`
→ Right. `for...of` gives you each item in order, with no counter to manage.
○ `while (list)`
→ Not quite. The list isn't a yes-or-no condition, so `while` can't use it that way.
```

```quiz
What does `for (const key in stock)` give you on each pass?
○ The value stored under the key.
→ Not quite. That's `stock[key]`. The loop gives you the key itself.
◉ The name of one entry in the object.
→ Right. `for...in` gives you each key in turn, and you look up the value yourself.
○ The number of entries in the object.
→ Not quite. That's not what the loop provides.
```
