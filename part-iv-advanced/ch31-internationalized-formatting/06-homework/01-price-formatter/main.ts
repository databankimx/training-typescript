// TODO: write formatPrice(amount: number, currency: string): string.
// It should use the en-US locale and return the amount in the chosen currency.
function formatPrice(amount: number, currency: string): string {
  return `${amount}`;
}

console.log(formatPrice(1234.5, "EUR"));
console.log(formatPrice(1234.5, "USD"));
