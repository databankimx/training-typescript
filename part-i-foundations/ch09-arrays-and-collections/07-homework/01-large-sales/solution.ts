const sales: number[] = [120, 45, 300, 80];

const large: number[] = sales.filter((s: number) => s > 100);

let total: number = 0;
for (const sale of large) {
  total = total + sale;
}

console.log(total);
