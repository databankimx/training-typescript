# Maps and sets

An array finds things by position. Often you want to find things by name: the age of a customer, the price of a product. A **map** stores pairs of a key and a value, and looks the value up by its key. A **set** is a collection where each value appears only once, which is useful for a list of unique tags, or for checking membership quickly.

> **Coming from JavaScript:** `Map` and `Set` are the same in both languages. The `Map<string, number>` and `Set<string>` labels are the TypeScript part.

## The program

The program is already in `main.ts`:

```ts
const ages: Map<string, number> = new Map();
ages.set("Ada", 36);
ages.set("Grace", 85);

console.log(ages.get("Ada"));
console.log(ages.has("Linus"));

const tags: Set<string> = new Set(["blue", "red", "blue"]);
console.log(tags.size);
```

Press **Run**. You should see:

```
36
false
2
```

For the map:

- **`new Map()`** creates an empty map. The label says its keys are text and its values are numbers.
- **`ages.set("Ada", 36)`** stores the value `36` under the key `"Ada"`.
- **`ages.get("Ada")`** looks up the value for that key, which is `36`.
- **`ages.has("Linus")`** asks whether the key is present. It isn't, so the answer is `false`.

For the set:

- **`new Set([...])`** creates a set from a list. The duplicate `"blue"` is kept only once.
- **`tags.size`** counts the values, which is `2`: `blue` and `red`.

## Map or record?

Both store named values. A record is an object, and its names are written as properties. A map is built for adding and removing entries while the program runs, and its keys can be any type, not just text. For a fixed set of names, an object or a record reads well. For a collection that grows and shrinks, a map is usually the better choice.

## Try it

- Add `ages.set("Linus", 54)`, and check that `has("Linus")` is now `true`.
- Add `"red"` to `tags` a second time, and check that `size` doesn't change.
- Use `ages.get("Linus")` before you add Linus. What's printed, and what's its type?

## Quiz

```quiz
What does `ages.get("Linus")` give you when `"Linus"` has not been set?
○ `0`
→ Not quite. A map doesn't invent a default value.
◉ `undefined`
→ Right. A missing key gives `undefined`, which is the missing-value case from the earlier chapter.
○ `""`
→ Not quite. A missing key doesn't give empty text.
```

```quiz
Why is `tags.size` `2` in the example, rather than `3`?
○ Because the list had only two words.
→ Not quite. The list had three words, but one was repeated.
◉ Because a set keeps each value once, so the second `"blue"` is ignored.
→ Right. A set holds unique values, so repeated values don't add to its size.
○ Because sets can't hold text.
→ Not quite. A set of text is exactly what this example uses.
```
