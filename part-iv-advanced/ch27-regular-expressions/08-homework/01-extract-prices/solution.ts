// Returns the price in each piece of text, as a number. A price is a dollar sign, then digits with an optional decimal part.
function extractPrices(text: string): number[] {
  const prices: number[] = [];
  for (const found of text.matchAll(/\$(\d+(?:\.\d+)?)/g)) {
    prices.push(Number(found[1]));
  }
  return prices;
}

const menu: string = "Tea $3.50, cake $4";
console.log(extractPrices(menu).join(", "));
