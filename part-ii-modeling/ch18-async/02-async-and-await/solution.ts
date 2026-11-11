function fetchPrice(item: string): Promise<number> {
  return new Promise<number>((resolve) => {
    setTimeout(() => resolve(item === "mug" ? 12 : 5), 50);
  });
}

async function showPrice(): Promise<void> {
  const price: number = await fetchPrice("mug");
  console.log(`Mug costs ${price}`);
}

void showPrice();
console.log("requested");
