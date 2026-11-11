// One formatter is made per currency and kept in a map, so each currency's formatter is created only once.
const formatters: Map<string, Intl.NumberFormat> = new Map<string, Intl.NumberFormat>();

// en-US names the locale, so the symbol, commas, and decimals are the same on every machine.
function formatPrice(amount: number, currency: string): string {
  let formatter: Intl.NumberFormat | undefined = formatters.get(currency);
  if (formatter === undefined) {
    formatter = new Intl.NumberFormat("en-US", { style: "currency", currency });
    formatters.set(currency, formatter);
  }
  return formatter.format(amount);
}

console.log(formatPrice(1234.5, "EUR"));
console.log(formatPrice(1234.5, "USD"));
