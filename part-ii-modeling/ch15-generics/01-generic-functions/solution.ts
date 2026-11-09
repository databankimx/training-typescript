function firstOf<T>(items: T[]): T | undefined {
  return items[0];
}

console.log(firstOf([10, 20]));
console.log(firstOf(["a", "b"]));
