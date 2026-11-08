# Listing keys and values

A record's names aren't fixed, so a program often needs to ask what names are there. JavaScript provides two tools for that. `Object.keys` gives you the names as a list, and `Object.values` gives you the values as a list. Both are ready to use with the loops from the previous chapter.

> **Coming from JavaScript:** `Object.keys` and `Object.values` are the same in both languages. The `.join` and `.length` on the result are ordinary list tools.

## The program

The program is already in `main.ts`:

```ts
const scores: Record<string, number> = { maths: 90, art: 75 };

console.log(Object.keys(scores).join(", "));
console.log(Object.values(scores).length);

for (const subject of Object.keys(scores)) {
  console.log(`${subject} ${scores[subject]}`);
}
```

Press **Run**. You should see:

```
maths, art
2
maths 90
art 75
```

Here's what each line does:

- **`Object.keys(scores)`** returns the names, `maths` and `art`, as a list of text.
- **`.join(", ")`** joins that list into one line, with a comma and a space between names.
- **`Object.values(scores).length`** counts the values. Two values, so the answer is `2`.
- **The loop** goes through the names in turn, and `scores[subject]` looks up each value. This is the same idea as `for...in`, written with a list of names.

The order of the names is the order in which they were added to the object. Don't depend on that order for anything important, because it isn't a promise the language makes.

## Try it

- Add a third subject to `scores`, and check that all three lines pick it up.
- Change `join(", ")` to `join(" and ")`. What does the first line show?
- Write `Object.values(scores).reduce`, and look at what your editor suggests. You'll use it properly in the homework.

## Quiz

```quiz
What does `Object.keys({ a: 1, b: 2 })` give you?
○ `[1, 2]`
→ Not quite. Those are the values. `keys` gives the names.
◉ `["a", "b"]`
→ Right. `keys` gives the names of the properties, as a list of text.
○ `"a, b"`
→ Not quite. `keys` gives a list. Joining it into one line is a separate step.
```

```quiz
Why is `scores[subject]` used inside the loop, rather than `scores.subject`?
○ Because `scores.subject` is always an error.
→ Not quite. It isn't always an error, but it looks for a property literally named `subject`.
◉ Because `subject` holds a name from the loop, and brackets read the property with that name.
→ Right. Brackets use the value of `subject`, so each name in turn is looked up.
○ Because brackets are faster.
→ Not quite. The reason is that brackets use the value of the variable.
```
