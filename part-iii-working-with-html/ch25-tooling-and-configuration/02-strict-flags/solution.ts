function greet(name: string): string {
  return `Hello, ${name}`;
}

const values: number[] = [1, 2, 3];
let total: number = 0;
for (const value of values) {
  total = total + value;
}

console.log(greet("Ada"), total);
