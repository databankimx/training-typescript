const prices: number[] = [4, 10, 3];

// map: change every item. filter: keep the items that pass the test. reduce: combine the items into one value.
const doubled: number[] = prices.map((price: number): number => price * 2);
const large: number[] = doubled.filter((price: number): boolean => price > 7);
const total: number = large.reduce((sum: number, price: number): number => sum + price, 0);

console.log(large.join(", "));
console.log(total);
