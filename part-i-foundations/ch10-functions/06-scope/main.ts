const rate: number = 0.25;

function withTax(price: number): number {
  const tax: number = price * rate;
  return price + tax;
}

console.log(withTax(50));
