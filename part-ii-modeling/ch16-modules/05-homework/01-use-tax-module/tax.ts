export function applyTax(price: number, rate: number): number {
  return price + price * rate;
}
