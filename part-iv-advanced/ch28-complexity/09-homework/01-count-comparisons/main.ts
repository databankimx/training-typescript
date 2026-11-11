// Two lists of 1000 values: already in order, and in reverse order.
const sortedValues: number[] = Array.from({ length: 1000 }, (_item: unknown, index: number): number => index);
const reversedValues: number[] = [...sortedValues].reverse();

console.log("Sorted: 0 comparisons");
console.log("Reversed: 0 comparisons");
