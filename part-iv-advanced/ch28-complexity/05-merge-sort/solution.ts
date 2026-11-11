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

// Joins two sorted lists into one sorted list by always taking the smaller front value.
function merge(left: number[], right: number[]): number[] {
  const result: number[] = [];
  let i: number = 0;
  let j: number = 0;
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i]);
      i++;
    } else {
      result.push(right[j]);
      j++;
    }
  }
  return result.concat(left.slice(i), right.slice(j));
}

// Splits the list in half, sorts each half the same way, and merges the two sorted halves.
function mergeSort(items: number[]): number[] {
  if (items.length <= 1) {
    return items;
  }
  const middle: number = Math.floor(items.length / 2);
  const left: number[] = mergeSort(items.slice(0, middle));
  const right: number[] = mergeSort(items.slice(middle));
  return merge(left, right);
}

const sorted: number[] = mergeSort(makeNumbers(1000, 2026));
console.log(`Merge sort: sorted: ${isSorted(sorted)}`);
