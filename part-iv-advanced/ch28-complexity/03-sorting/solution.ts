// A repeatable list of numbers. The same seed always gives the same list, so the counts never change between runs.
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

// Find the smallest remaining value and swap it into place. Every pair is compared, so the count never changes.
function selectionSort(input: number[]): { items: number[]; comparisons: number } {
  const items: number[] = [...input];
  let comparisons: number = 0;
  for (let i: number = 0; i < items.length - 1; i++) {
    let smallest: number = i;
    for (let j: number = i + 1; j < items.length; j++) {
      comparisons++;
      if (items[j] < items[smallest]) {
        smallest = j;
      }
    }
    [items[i], items[smallest]] = [items[smallest], items[i]];
  }
  return { items, comparisons };
}

// Swap neighbours that are out of order, and stop early when a pass makes no swap. The count depends on the data.
function bubbleSort(input: number[]): { items: number[]; comparisons: number } {
  const items: number[] = [...input];
  let comparisons: number = 0;
  let swapped: boolean = true;
  for (let end: number = items.length - 1; swapped && end > 0; end--) {
    swapped = false;
    for (let i: number = 0; i < end; i++) {
      comparisons++;
      if (items[i] > items[i + 1]) {
        [items[i], items[i + 1]] = [items[i + 1], items[i]];
        swapped = true;
      }
    }
  }
  return { items, comparisons };
}

// Take each value and slide it left into the sorted part at the front. The count depends on the data.
function insertionSort(input: number[]): { items: number[]; comparisons: number } {
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
  return { items, comparisons };
}

const numbers: number[] = makeNumbers(1000, 2026);

const selection = selectionSort(numbers);
console.log(`Selection sort: ${selection.comparisons} comparisons, sorted: ${isSorted(selection.items)}`);

const bubble = bubbleSort(numbers);
console.log(`Bubble sort: ${bubble.comparisons} comparisons, sorted: ${isSorted(bubble.items)}`);

const insertion = insertionSort(numbers);
console.log(`Insertion sort: ${insertion.comparisons} comparisons, sorted: ${isSorted(insertion.items)}`);
