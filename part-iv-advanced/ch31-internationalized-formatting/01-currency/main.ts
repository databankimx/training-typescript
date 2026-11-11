const amount: number = 1234.5;

// The locale and the currency are named in the code, so every reader sees the same format.
const dollars: Intl.NumberFormat = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });
const pounds: Intl.NumberFormat = new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" });

console.log(dollars.format(amount));
console.log(pounds.format(amount));
