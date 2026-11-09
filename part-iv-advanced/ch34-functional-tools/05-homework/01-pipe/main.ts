const double = (n: number): number => n * 2;
const addOne = (n: number): number => n + 1;

// TODO: write pipe(...steps). It should return a function that passes its input through each step, in order.
function pipe(...steps: Array<(n: number) => number>): (n: number) => number {
  return (n: number): number => n;
}

console.log(pipe(addOne, double)(4));
console.log(pipe(double, addOne)(4));
