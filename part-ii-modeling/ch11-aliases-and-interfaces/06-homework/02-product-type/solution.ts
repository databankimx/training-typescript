type Sku = string;

interface Product {
  readonly sku: Sku;
  name: string;
  price: number;
}

const mug: Product = { sku: "MUG-01", name: "Mug", price: 12 };

console.log(`${mug.sku}: ${mug.name} at ${mug.price}`);
