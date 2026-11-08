const prices: number[] = [5, 10, 3];

let running: number = 0;

for (const price of prices) {
  running = running + price;
  console.log(running);
}
