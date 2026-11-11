# Linear and binary search

Searching is the clearest place to see complexity at work. A linear search checks each value in turn, so the worst case is one comparison per value. A binary search only works on sorted values, and it halves the remaining range at each step, so the worst case grows only with the number of times you can halve the input.

> **Coming from JavaScript:** the search code is identical in both languages. The `number[]` parameters and the `number` counters are the TypeScript part.

## The program

The values are the whole numbers from 0 to 999, already sorted. We search for 777:

```typescript
console.log(`Linear search: ${linearSearch(values, target)} comparisons`);
console.log(`Binary search: ${binarySearch(values, target)} comparisons`);
```

```text
Linear search: 778 comparisons
Binary search: 10 comparisons
```

The linear search looks at 0, then 1, and so on up to 777, which is 778 looks. The binary search looks at the middle, which is 499, finds it too small, and keeps only the upper half. Each look discards half the remaining values, so 777 takes 10 looks.

## Why sorting is required

Binary search depends on the rule that every value to the left of the middle is smaller. Unsorted values give no such rule, so a look at the middle cannot tell you which half to keep. Sorting costs work of its own, which is why the rest of this chapter matters: it is the price of making a fast search possible.

## The visualizer

Press **Visualize** to open an animation of the search. It starts on linear search, and the drop-down lets you switch to binary search. Watch the number of steps for the same target.

## Try it yourself

- Change `target` to `0`, then to `999`. How many comparisons does each search make now?
- Remove the sorting assumption by reversing the values array, then run the binary search. What does it report, and why is that wrong?

## Quiz

```quiz
Why does binary search need the values to be sorted?
○ Because sorted values are easier to print.
→ Not quite. Printing order is not the reason.
◉ Because each look at the middle must tell the search which half can still hold the target.
→ Right. Without order, a look at the middle gives no guidance.
○ Because binary search works by adding the values.
→ Not quite. It compares the middle value with the target.
```

```quiz
For 1000 sorted values, roughly how many looks does a binary search need at most?
○ 1000, one for each value.
→ Not quite. Binary search needs far fewer looks than there are values.
◉ About 10, because each look halves the remaining values.
→ Right. Two to the power ten is about a thousand, so ten halvings cover 1000 values.
○ 2, because it only ever checks two values.
→ Not quite. It checks the middle of a range, and the range shrinks step by step.
```
