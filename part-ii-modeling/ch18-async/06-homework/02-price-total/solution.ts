function priceOf(name: string): Promise<number> {
  return new Promise<number>((resolve) => {
    setTimeout(() => resolve(name.length), 20);
  });
}

async function total(items: string[]): Promise<number> {
  const prices: number[] = await Promise.all(items.map((item: string) => priceOf(item)));
  let sum: number = 0;
  for (const price of prices) {
    sum = sum + price;
  }
  return sum;
}

async function main(): Promise<void> {
  console.log(await total(["mug", "plate"]));
}

void main();
