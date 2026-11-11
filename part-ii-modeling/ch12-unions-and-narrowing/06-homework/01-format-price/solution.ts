function formatPrice(price: number | string): string {
  if (typeof price === "number") {
    return `$${price.toFixed(2)}`;
  }
  return price;
}

console.log(formatPrice(12));
