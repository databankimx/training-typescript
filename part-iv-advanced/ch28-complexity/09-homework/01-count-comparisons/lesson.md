# Homework: counting comparisons

Insertion sort is quick on a list that is already in order and slow on one that is in reverse. This exercise makes both costs visible by counting the comparisons on each.

> **Coming from JavaScript:** the counting is the same in both languages. The `number[]` and `number` types are the TypeScript part.

## The task

The starter `main.ts` builds the two lists, and prints placeholder counts. Start from it, in your own file:

1. Write `countInsertionComparisons(input: number[]): number`. It copies the input, runs insertion sort on the copy, and returns the number of comparisons. The input list must not change.
2. Print the count for the sorted list, then the count for the reversed list, in the form shown below.

The expected output is:

```text
Sorted: 999 comparisons
Reversed: 499500 comparisons
```

## Hints

- On a sorted list, each value stops at its first comparison, and there are 999 values to place.
- On a reversed list, each value passes every value before it. The counts for the values are 1, 2, up to 999, and their total is `999 × 1000 ÷ 2`.
- Copy the input with `[...input]` so the original stays unchanged.

## Try it yourself

- Change the lists to 2000 values. Predict both counts before you run the program.
- Shuffle the reversed list with the seeded numbers from the sorting step. Where does the count fall between the two extremes?

## Quiz

```quiz
Why does insertion sort make 499500 comparisons on the reversed list?
○ Because the sorted list is checked again after the sort finishes.
→ Not quite. A final check is a single pass, and it does not account for this total.
◉ Because each value passes all the values before it, which sums to 1 + 2 + ... + 999.
→ Right. The total is the sum of the shifts, which is 999 × 1000 ÷ 2.
○ Because the list is copied before sorting.
→ Not quite. Copying does not make comparisons.
```
