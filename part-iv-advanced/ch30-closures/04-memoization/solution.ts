// Wraps a function so that each input is computed once. The cache lives in the closure.
function memoize(compute: (n: number) => number): (n: number) => number {
  const cache: Map<number, number> = new Map<number, number>();
  return (n: number): number => {
    const remembered: number | undefined = cache.get(n);
    if (remembered !== undefined) {
      return remembered;
    }
    const result: number = compute(n);
    cache.set(n, result);
    return result;
  };
}

let calls: number = 0;
const slowSquare = (n: number): number => {
  calls++;
  return n * n;
};

const fast = memoize(slowSquare);
console.log(fast(4), fast(4), fast(4));
console.log(calls);
