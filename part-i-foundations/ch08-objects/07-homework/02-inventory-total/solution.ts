const stock: Record<string, number> = { apples: 3, pears: 4 };

let total: number = 0;

for (const count of Object.values(stock)) {
  total = total + count;
}

console.log(total);
