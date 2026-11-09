# Shell sort

Insertion sort is slow on a list whose small values start near the end, because each value can move only one place at a time. Shell sort fixes that by first running insertion sort over values that are far apart, then over closer ones, and finally over neighbours. Values travel long distances early, so the last pass has little left to do.

> **Coming from JavaScript:** the loops are the same in both languages. The `gap` variable and the typed `number` parameters are the TypeScript part.

## The program

```typescript
const items: number[] = makeNumbers(1000, 2026);
shellSort(items);
console.log(`Shell sort: sorted: ${isSorted(items)}`);
```

```text
Shell sort: sorted: true
```

The gaps start at half the list length, and halve each time. When the gap is one, the final pass is an ordinary insertion sort, but by then almost every value is already close to its place.

## Why the gap sequence matters

The speed of Shell sort depends on the gaps. Halving is simple, but it is not the best sequence, and a sequence chosen with care gives a noticeably faster sort. Finding the best sequence is an open problem, so the choice is a trade between simplicity and speed.

## The visualizer

Press **Visualize** to watch the gaps shrink. Each pass moves values that are far apart, and the final pass finishes the sort.

## Try it yourself

- Change `gap` so each gap is one less than half the previous one. Does the list still sort correctly?
- Set the gap to a constant 1 at the start. Does the program still sort, and how does its speed change?

## Quiz

```quiz
Why does Shell sort start with large gaps?
○ Because the gaps must be larger than the list.
→ Not quite. The gaps are always smaller than the list length.
◉ Because values can then move long distances early, so the final pass has little left to do.
→ Right. Moving values far at the start reduces the work of insertion sort at the end.
○ Because a large gap is the only way to compare two values.
→ Not quite. Every comparison compares two values, whatever the gap.
```
