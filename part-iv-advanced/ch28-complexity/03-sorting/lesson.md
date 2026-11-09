# Selection, bubble, and insertion sort

These three sorts are easy to write and slow on large lists. Each one has the same worst-case shape, roughly `n²` work, but they differ in how much of that work depends on the data. Counting the comparisons each one makes shows the difference.

> **Coming from JavaScript:** the sorts are identical in both languages. The `{ items: number[]; comparisons: number }` return type is the TypeScript part, and it names both results so the caller can't mix them up.

## The program

```typescript
const numbers: number[] = makeNumbers(1000, 2026);

const selection = selectionSort(numbers);
console.log(`Selection sort: ${selection.comparisons} comparisons, sorted: ${isSorted(selection.items)}`);
```

```text
Selection sort: 499500 comparisons, sorted: true
```

The other two lines of output also show a comparison count and `sorted: true`. Their counts depend on the particular values, so the lesson doesn't state them.

## Why selection sort's count is fixed

Selection sort scans the rest of the list for the smallest value, every time, whatever order the values are in. For 1000 values, that is 999 scans of decreasing length, and the total is `1000 × 999 ÷ 2`, which is 499500. The count never changes, even for a list that is already sorted.

## Why the other two vary

Bubble sort stops early when a whole pass makes no swap, so a nearly sorted list finishes quickly. Insertion sort slides each value only as far as it must, so a list that is already in order needs almost no comparisons. Both are fast on good input and slow on bad input, which is why the count depends on the data.

## The visualizer

Press **Visualize** to watch selection sort work through the list. The drop-down switches to bubble and insertion sort, so you can compare how each one moves the values.

## Try it yourself

- Change the seed in `makeNumbers(1000, 2026)` to another number. Does selection sort's count change? Do the other two?
- Sort a list that is already in order. Which of the three sorts makes the fewest comparisons, and why?

## Quiz

```quiz
Why is selection sort's comparison count the same for every list of 1000 values?
○ Because the list is always sorted first.
→ Not quite. The list is not sorted before selection sort runs.
◉ Because it scans the rest of the list for each position, whatever the order of the values.
→ Right. Every pair is compared, so the count depends only on the length.
○ Because the sort stops after 1000 comparisons.
→ Not quite. It makes 499500 comparisons, which is the sum of the scans.
```

```quiz
Insertion sort makes very few comparisons on a list that is already in order. Why?
○ Selection sort, because it skips sorted values.
→ Not quite. Selection sort scans every remaining value, sorted or not.
◉ Because each value is already in place, so it stops at its first comparison.
→ Right. A sorted list means every new value stops at its first comparison.
○ Because it sorts the list in reverse first.
→ Not quite. It does not reverse anything.
```
