export interface Product {
  name: string;
  price: number;
}

export function formatProduct(product: Product): string {
  return `${product.name}: ${product.price.toFixed(2)}`;
}
