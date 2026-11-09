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

// Insertion sort over every gap-th value. Values that are far apart are compared first, so they move a long way early.
function shellSort(items: number[]): void {
  for (let gap: number = Math.floor(items.length / 2); gap > 0; gap = Math.floor(gap / 2)) {
    for (let i: number = gap; i < items.length; i++) {
      const value: number = items[i];
      let j: number = i;
      while (j >= gap && items[j - gap] > value) {
        items[j] = items[j - gap];
        j -= gap;
      }
      items[j] = value;
    }
  }
}

const items: number[] = makeNumbers(1000, 2026);
shellSort(items);
console.log(`Shell sort: sorted: ${isSorted(items)}`);
