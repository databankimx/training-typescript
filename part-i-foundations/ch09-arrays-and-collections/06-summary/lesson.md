## Summary: Arrays and collections

Collections hold many values. Choosing the right one makes the code say what it means.

* **An array is an ordered list.** Positions start at zero, and `push` adds to the end.
* **`map`, `filter`, and `find` build new results from a list.** `map` changes each item, `filter` keeps some, and `find` returns the first match.
* **A nested array is a list of lists.** Read `grid[1][2]` one pair of brackets at a time.
* **A tuple has a fixed length and fixed types.** Destructuring gives each position a name.
* **A map looks up values by key, and a set keeps each value once.** Use a map when you look things up by name, and a set when you only need to know what's there.

### Check your understanding

*These questions are written for this course.*

```quiz
Which method gives you a new list with only the items that pass a test?
○ `map`
→ Not quite. `map` changes every item, rather than keeping some of them.
◉ `filter`
→ Right. `filter` keeps the items that pass the test.
○ `push`
→ Not quite. `push` adds an item to the end of the list.
```

```quiz
What does the label `[string, number]` describe?
○ A list of any length, with text and numbers in it.
→ Not quite. A tuple has a fixed length and fixed types, and the label says so.
◉ A tuple of exactly two items: text first, then a number.
→ Right. The label fixes the length and the type of each position.
○ A map from text to numbers.
→ Not quite. A map is written with `Map`, and that's a different label.
```

```quiz
What does `new Set(["a", "b", "a"]).size` give you?
○ `3`
→ Not quite. A set keeps each value once, so the second `"a"` isn't counted.
◉ `2`
→ Right. The set holds `"a"` and `"b"`, once each.
○ `1`
→ Not quite. `"b"` is a different value, so it's counted as well.
```
