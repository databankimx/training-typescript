// Joins two functions: the result of g is passed to f. The types must line up, so g's result is f's input.
function compose<A, B, C>(f: (b: B) => C, g: (a: A) => B): (a: A) => C {
  return (a: A): C => f(g(a));
}

const double = (n: number): number => n * 2;
const addOne = (n: number): number => n + 1;

// addOne runs first (4 + 1 = 5), then double (5 × 2 = 10).
const doubleAfterAdding = compose(double, addOne);
console.log(doubleAfterAdding(4));

// The other order: double runs first (4 × 2 = 8), then addOne (8 + 1 = 9).
const addingAfterDoubling = compose(addOne, double);
console.log(addingAfterDoubling(4));
