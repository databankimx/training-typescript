interface Product {
  sku: string;
  name: string;
  price: number;
}

const mug: Product = { sku: "MUG-01", name: "Mug", price: 12 };

const frozen: Readonly<Product> = mug;
const update: Partial<Product> = { price: 10 };
const summary: Pick<Product, "sku" | "name"> = { sku: mug.sku, name: mug.name };

console.log(frozen.price);
console.log(`${summary.sku}: ${summary.name} at ${update.price ?? mug.price}`);
