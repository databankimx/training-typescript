function describe(value: string | number): string {
  if (typeof value === "number") {
    return `number, doubled: ${value * 2}`;
  }
  return `text, shouted: ${value.toUpperCase()}`;
}

console.log(describe(21));
console.log(describe("hi"));
