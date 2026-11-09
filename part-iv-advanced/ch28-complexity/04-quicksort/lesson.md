# Quicksort

Quicksort chooses a pivot, moves every smaller value to its left and every larger value to its right, and then sorts each side. Once a value is placed next to the pivot on the correct side, it never moves again, so no merging is needed at the end. The visualizer shows the pivot being chosen and the values moving around it.

> **Coming from JavaScript:** the algorithm is identical in both languages. The `low` and `high` parameters are typed as numbers, and the `swap` helper keeps the moves in one place.

## The program

```typescript
const items: number[] = makeNumbers(1000, 2026);
quickSort(items, 0, items.length - 1);
console.log(`Quicksort: sorted: ${isSorted(items)}`);
```

```text
Quicksort: sorted: true
```

The partition step is the heart of the algorithm. It takes the last value as the pivot, sweeps the others, and swaps every smaller value to the front of the range. The pivot then goes into the boundary between the smaller and larger groups.

## Why the pivot matters

On average, each partition splits the values into two groups of roughly equal size, and the work is about `n log n`. But if the pivot is always the largest or smallest value, one group is empty each time, and the work becomes `n²`. A sorted list is exactly that bad case for this choice of pivot.

Real implementations choose the pivot more carefully, for example as the median of three values. The choice changes the speed on sorted or nearly sorted input.

## The visualizer

Press **Visualize** to watch the partitions. Each pivot is highlighted, and the values on either side of it settle into place.

## Try it yourself

- Change `makeNumbers(1000, 2026)` to a list that is already sorted, such as `Array.from({ length: 1000 }, (_v, i) => i)`. Does the program still sort it correctly? How deep does the recursion go?
- Find a seed that gives a different list. Does the output change?

## Quiz

```quiz
Why does quicksort's speed depend on which value is chosen as the pivot?
○ Because the pivot is the value that is printed.
→ Not quite. The pivot is used to split the values, and nothing is printed from it.
◉ Because a good pivot splits the values into two roughly equal groups, and a bad one leaves one group almost empty.
→ Right. Balanced groups mean fewer levels of recursion.
○ Because the pivot must be a number between 0 and 1.
→ Not quite. The pivot is one of the values being sorted.
```
