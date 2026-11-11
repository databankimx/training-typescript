// Builds a list of count items, each made by the callback from its index. T is inferred from what the callback returns.
function createList<T>(count: number, make: (index: number) => T): T[] {
  const items: T[] = [];
  for (let index: number = 0; index < count; index++) {
    items.push(make(index));
  }
  return items;
}

// The callback returns a number, so T is number, and the list is number[].
console.log(createList(3, (index: number): number => index * 2).join(", "));

// The callback returns text, so T is string, and the list is string[].
console.log(createList(2, (index: number): string => `item ${index}`).join(", "));
