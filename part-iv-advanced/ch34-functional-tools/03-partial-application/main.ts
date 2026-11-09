// Takes the first argument now, and returns a function that takes the second argument later.
function multiply(factor: number): (value: number) => number {
  return (value: number): number => factor * value;
}

// triple is multiply with its first argument fixed at 3.
const triple = multiply(3);
console.log(triple(7));

// The one-argument function can be passed straight to map.
console.log([1, 2, 3].map(triple).join(", "));
