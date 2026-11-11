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

// In a max heap, each value is at least as large as the values below it. The children of position p are at 2p + 1 and 2p + 2.
// Moves the value at start down until both children are no larger than it.
function siftDown(items: number[], start: number, size: number): void {
  let root: number = start;
  while (true) {
    let largest: number = root;
    const left: number = 2 * root + 1;
    const right: number = 2 * root + 2;
    if (left < size && items[left] > items[largest]) {
      largest = left;
    }
    if (right < size && items[right] > items[largest]) {
      largest = right;
    }
    if (largest === root) {
      return;
    }
    swap(items, root, largest);
    root = largest;
  }
}

function heapSort(items: number[]): void {
  const size: number = items.length;
  // Build the heap: every position that has children, from the bottom up.
  for (let start: number = Math.floor(size / 2) - 1; start >= 0; start--) {
    siftDown(items, start, size);
  }
  // Repeatedly move the largest value to the end, and restore the heap on what remains.
  for (let end: number = size - 1; end > 0; end--) {
    swap(items, 0, end);
    siftDown(items, 0, end);
  }
}

const items: number[] = makeNumbers(1000, 2026);
heapSort(items);
console.log(`Heap sort: sorted: ${isSorted(items)}`);
