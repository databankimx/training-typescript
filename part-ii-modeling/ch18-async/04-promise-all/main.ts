function delay<T>(value: T, ms: number): Promise<T> {
  return new Promise<T>((resolve) => {
    setTimeout(() => resolve(value), ms);
  });
}

async function totals(): Promise<void> {
  const [mugs, plates] = await Promise.all([delay(3, 60), delay(5, 30)]);
  console.log(`Total items: ${mugs + plates}`);
}

void totals();
