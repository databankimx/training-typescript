// The sum of the whole numbers from 1 up to n, written two ways.

function sumWithLoop(n: number): number {
  let total: number = 0;
  for (let value: number = 1; value <= n; value++) {
    total = total + value;
  }
  return total;
}

function sumWithRecursion(n: number): number {
  if (n === 0) {
    return 0;
  }
  return n + sumWithRecursion(n - 1);
}

console.log(sumWithLoop(5));
console.log(sumWithRecursion(5));
