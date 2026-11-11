function total(prices: number[]): number {
  let sum: number = 0;
  for (const price of prices) {
    sum = sum + price;
  }
  return sum;
}

function logTotal(prices: number[]): void {
  console.log(`Total: ${total(prices)}`);
}

const basket: number[] = [4, 6, 10];

console.log(total(basket));
logTotal(basket);
