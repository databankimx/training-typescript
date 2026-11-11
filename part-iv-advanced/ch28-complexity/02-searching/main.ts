// 1000 sorted values: 0, 1, 2, ... 999. Searching for 777 shows how the two methods differ.
const values: number[] = Array.from({ length: 1000 }, (_item: unknown, index: number): number => index);
const target: number = 777;

// Look at every value in order until the target turns up. Each look is one comparison.
function linearSearch(items: number[], wanted: number): number {
  let comparisons: number = 0;
  for (let index: number = 0; index < items.length; index++) {
    comparisons++;
    if (items[index] === wanted) {
      break;
    }
  }
  return comparisons;
}

// Look at the middle value, then throw away the half that cannot contain the target. Needs sorted values.
function binarySearch(items: number[], wanted: number): number {
  let comparisons: number = 0;
  let low: number = 0;
  let high: number = items.length - 1;
  while (low <= high) {
    const middle: number = Math.floor((low + high) / 2);
    comparisons++;
    if (items[middle] === wanted) {
      break;
    }
    if (items[middle] < wanted) {
      low = middle + 1;
    } else {
      high = middle - 1;
    }
  }
  return comparisons;
}

console.log(`Linear search: ${linearSearch(values, target)} comparisons`);
console.log(`Binary search: ${binarySearch(values, target)} comparisons`);
