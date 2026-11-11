# Heap sort

A heap is a list arranged as a tree, where every value is at least as large as the values below it. The largest value is always at the top, and it can be taken off in one step. Heap sort builds a heap from the list, then takes the top value off, puts it at the end, and repairs the heap on what remains. It repeats until the list is sorted.

> **Coming from JavaScript:** the algorithm and its index arithmetic are identical in both languages. The `size` parameter and the typed `number[]` keep the parts of the list being repaired apart from the part already in place.

## The program

```typescript
const items: number[] = makeNumbers(1000, 2026);
heapSort(items);
console.log(`Heap sort: sorted: ${isSorted(items)}`);
```

```text
Heap sort: sorted: true
```

The list is stored without a separate tree. The children of the value at position `p` sit at `2p + 1` and `2p + 2`, so the tree's shape is implied by the positions. `siftDown` moves a value down until its children are no larger than it.

## Why heap sort does not need extra memory

Merge sort needs a new list at each level. Heap sort works inside the list it was given, swapping values into place. It does the same `n log n` work as merge sort, and it does not depend on the input order in the way quicksort does.

## The visualizer

Press **Visualize** to watch the heap form, and then watch the largest value move to the end at each step.

## Try it yourself

- Change `size` in `heapSort` to build the heap but skip the second loop. What does the list look like afterwards?
- Find the children of position 4. Which positions do they occupy, and why?

## Quiz

```quiz
In a max heap, where is the largest value?
○ At the end of the list.
→ Not quite. The largest value is at the top of the heap, which is the first position.
◉ At the first position, so it can be taken off in one step.
→ Right. The heap property puts the largest value at the top.
○ In the middle of the list.
→ Not quite. The heap property places it at the top.
```
