function cartTotal(prices: number[]): number {
  return prices.reduce((sum, price) => sum + price, 0);
}

// The prices came from a form, so convert them where they arrive.
const formPrices = ["20", "5", "3"];
console.log(cartTotal(formPrices.map(Number)));
