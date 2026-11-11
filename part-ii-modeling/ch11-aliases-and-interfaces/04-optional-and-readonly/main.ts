interface Product {
  readonly sku: string;
  name: string;
  discount?: number;
}

const mug: Product = { sku: "MUG-01", name: "Mug" };

console.log(mug.name);
console.log(mug.discount ?? 0);
