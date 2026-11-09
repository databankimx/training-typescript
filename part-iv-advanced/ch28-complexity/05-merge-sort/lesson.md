# Merge sort

Merge sort splits the list in half, sorts each half by the same method, and merges the two sorted halves into one. The splitting goes down about log n levels, and each level does about n work to merge. That gives roughly `n log n` work for every input, sorted or not.

> **Coming from JavaScript:** the algorithm is identical in both languages. The `number[]` results of each call are typed, so the caller can rely on getting a list back.

## The program

```typescript
const sorted: number[] = mergeSort(makeNumbers(1000, 2026));
console.log(`Merge sort: sorted: ${isSorted(sorted)}`);
```

```text
Merge sort: sorted: true
```

The `merge` function does the real work. It keeps a pointer into each sorted half, and at each step it copies the smaller front value to the result. When one half is used up, the rest of the other half is appended, because it is already in order.

## Why the work is steady

Quicksort's work depends on how well the pivot splits the values. Merge sort always splits the list exactly in half, so its work is the same whatever the order of the values. The price is memory: merging needs a new list at each level, which quicksort avoids.

## The visualizer

Press **Visualize** to watch the list divide and then merge. Each merge is shown as the halves combine.

## Try it yourself

- Reverse the input by changing `makeNumbers` to a list of 1000 values in descending order. Does the work change? Does the sort still produce a sorted list?
- Change `left[i] <= right[j]` to `left[i] < right[j]`. Does the result still sort correctly? Why does the choice matter when values repeat?

## Quiz

```quiz
Why does merge sort's work not depend on the order of the input?
○ Because the input is always sorted first.
→ Not quite. Merge sort does not sort the input first.
◉ Because it always splits the list exactly in half and merges the halves, whatever their contents.
→ Right. The splits are fixed by the length, so the work is the same for every order.
○ Because it only reads the input once.
→ Not quite. Every value is read at each level of merging.
```
