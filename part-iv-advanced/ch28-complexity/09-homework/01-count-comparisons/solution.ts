// Two lists of 1000 values: already in order, and in reverse order.
const sortedValues: number[] = Array.from({ length: 1000 }, (_item: unknown, index: number): number => index);
const reversedValues: number[] = [...sortedValues].reverse();

// Insertion sort on a copy, counting each comparison. The input list is left as it was.
function countInsertionComparisons(input: number[]): number {
  const items: number[] = [...input];
  let comparisons: number = 0;
  for (let i: number = 1; i < items.length; i++) {
    const value: number = items[i];
    let j: number = i - 1;
    while (j >= 0) {
      comparisons++;
      if (items[j] <= value) {
        break;
      }
      items[j + 1] = items[j];
      j--;
    }
    items[j + 1] = value;
  }
  return comparisons;
}

console.log(`Sorted: ${countInsertionComparisons(sortedValues)} comparisons`);
console.log(`Reversed: ${countInsertionComparisons(reversedValues)} comparisons`);
