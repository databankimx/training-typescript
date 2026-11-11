function cartTotal(prices: number[]): number {
  return prices.reduce((sum, price) => sum + price, 0);
}

// The prices came from a form, so they arrive as text.
console.log(cartTotal(["20", "5", "3"]));
