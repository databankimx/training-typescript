// A repeatable list of numbers, the same on every run.
function makeNumbers(count: number, seed: number): number[] {
  let state: number = seed;
  const numbers: number[] = [];
  for (let i: number = 0; i < count; i++) {
    state = (state * 16807) % 2147483647;
    numbers.push(state % 1000);
  }
  return numbers;
}

function isSorted(items: number[]): boolean {
  for (let i: number = 1; i < items.length; i++) {
    if (items[i - 1] > items[i]) {
      return false;
    }
  }
  return true;
}

function swap(items: number[], a: number, b: number): void {
  const temporary: number = items[a];
  items[a] = items[b];
  items[b] = temporary;
}

// Moves every value smaller than the pivot to its left, then puts the pivot between the two groups.
// Returns the pivot's final position.
function partition(items: number[], low: number, high: number): number {
  const pivot: number = items[high];
  let boundary: number = low;
  for (let i: number = low; i < high; i++) {
    if (items[i] < pivot) {
      swap(items, i, boundary);
      boundary++;
    }
  }
  swap(items, boundary, high);
  return boundary;
}

// Sorts the two groups on either side of the pivot. Each call's pivot is in its final place, so there is nothing to merge.
function quickSort(items: number[], low: number, high: number): void {
  if (low >= high) {
    return;
  }
  const pivotIndex: number = partition(items, low, high);
  quickSort(items, low, pivotIndex - 1);
  quickSort(items, pivotIndex + 1, high);
}

const items: number[] = makeNumbers(1000, 2026);
quickSort(items, 0, items.length - 1);
console.log(`Quicksort: sorted: ${isSorted(items)}`);
