// Each Fibonacci number is the sum of the two before it: 0, 1, 1, 2, 3, 5, 8, ...
let calls: number = 0;

function fib(n: number): number {
  calls = calls + 1;
  if (n < 2) {
    return n;
  }
  return fib(n - 1) + fib(n - 2);
}

console.log(fib(10));
console.log(`calls: ${calls}`);
