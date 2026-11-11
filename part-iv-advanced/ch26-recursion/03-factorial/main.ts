// The factorial of n is n × (n − 1) × … × 1. factorial(0) and factorial(1) are both 1.
function factorial(n: number): number {
  if (n <= 1) {
    return 1;
  }
  return n * factorial(n - 1);
}

console.log(factorial(5));
console.log(factorial(10));
