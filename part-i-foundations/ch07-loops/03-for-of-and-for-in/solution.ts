const cities: string[] = ["Dallas", "Austin", "Houston"];

for (const city of cities) {
  console.log(city);
}

const stock: Record<string, number> = { apples: 3, pears: 0 };

for (const item in stock) {
  console.log(`${item}: ${stock[item]}`);
}
