const TAX_RATE: number = 0.25;

export function priceWithTax(price: number): number {
  return price + price * TAX_RATE;
}
