const prices: Record<string, number> = { coffee: 3, bagel: 2 };

prices.tea = 2;

console.log(prices.tea);
console.log(prices["coffee"]);
