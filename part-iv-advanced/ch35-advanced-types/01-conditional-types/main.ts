// A conditional type reads like a ternary: if T is a Promise, give the type it resolves to; otherwise give T itself.
type Unwrap<T> = T extends Promise<infer Inner> ? Inner : T;

// Unwrap<Promise<number>> is number, so the value must be a number.
const fromPromise: Unwrap<Promise<number>> = 5;

// Unwrap<string> is string, because a string is not a promise.
const plain: Unwrap<string> = "text";

console.log(fromPromise);
console.log(plain);
