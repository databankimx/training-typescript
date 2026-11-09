// A list whose items are numbers, or lists of the same kind. The type refers to itself.
type NestedNumbers = (number | NestedNumbers)[];

function sumNested(items: NestedNumbers): number {
  let total: number = 0;
  for (const item of items) {
    // The ternary narrows each item: a number is added directly, a list is handed to the function again.
    total = total + (typeof item === "number" ? item : sumNested(item));
  }
  return total;
}

const data: NestedNumbers = [1, [2, 3], [4, [5]]];
console.log(sumNested(data));
