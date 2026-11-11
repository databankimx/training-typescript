function lastOf<T>(items: T[]): T | undefined {
  return items[items.length - 1];
}

const scores: number[] = [4, 9, 2];

console.log(lastOf(scores));
