const prices: number[] = [4, 12, 7, 20];

const doubled: number[] = prices.map((p: number) => p * 2);
const cheap: number[] = prices.filter((p: number) => p < 10);

console.log(doubled.join(", "));
console.log(cheap.join(", "));
console.log(prices.includes(12));
console.log(prices.find((p: number) => p > 10));
