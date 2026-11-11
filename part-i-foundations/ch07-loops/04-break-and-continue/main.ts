const numbers: number[] = [4, 7, -1, 9, 12];

for (const n of numbers) {
  if (n < 0) {
    break;
  }
  if (n % 2 === 0) {
    continue;
  }
  console.log(n);
}
