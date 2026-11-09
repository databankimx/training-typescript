## Summary: Complexity

Complexity describes how the work grows as the input grows. It lets you compare methods before running them.

* **A loop over n items does about n steps. Nested loops do about n² steps.** Counting the work by shape matters more than the exact count.
* **Binary search needs sorted values and about log n looks.** Linear search needs up to n looks.
* **Selection sort's comparison count is fixed.** Bubble and insertion sort depend on the data, and are fast on nearly sorted input.
* **Quicksort depends on its pivot, and merge sort and heap sort do not.** Merge sort needs extra memory. Heap sort works in place.
* **Shell sort speeds up insertion sort by moving values far early.** Its speed depends on the gap sequence.

### Check your understanding

*These questions are written for this course.*

```quiz
A list of n values is sorted by insertion sort. Which input gives the most comparisons?
○ A list that is already in order.
→ Not quite. A sorted list needs only about one comparison per value.
◉ A list in reverse order, because each value must move past everything before it.
→ Right. Reversed input forces the longest possible shifts.
○ A list of equal values.
→ Not quite. Equal values stop the shifting at once.
```

```quiz
Why is binary search much faster than linear search on a large sorted list?
○ Because it skips the values it has already seen.
→ Not quite. It discards half the remaining range at each look.
◉ Because each look halves the range still to be searched.
→ Right. Halving repeatedly reaches the target in about log n looks.
○ Because the list is stored in a smaller form.
→ Not quite. The list is the same. The method is what changes.
```

```quiz
Which sort's work does not depend on the order of the input?
○ Quicksort, because it chooses a pivot.
→ Not quite. Its work depends on how well the pivot splits the values.
◉ Merge sort, because it always splits the list in half.
→ Right. The splits depend only on the length, so the work is steady.
○ Bubble sort, because it stops early.
→ Not quite. Stopping early means its work depends on the data.
```
