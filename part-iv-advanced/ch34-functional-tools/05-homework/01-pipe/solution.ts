const double = (n: number): number => n * 2;
const addOne = (n: number): number => n + 1;

// Each step receives the result of the step before it. reduce carries the value along, starting from the input.
function pipe(...steps: Array<(n: number) => number>): (n: number) => number {
  return (n: number): number => steps.reduce((value: number, step: (n: number) => number): number => step(value), n);
}

console.log(pipe(addOne, double)(4));
console.log(pipe(double, addOne)(4));
