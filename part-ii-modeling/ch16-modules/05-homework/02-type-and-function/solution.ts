import type { Product } from "./product.ts";
import { formatProduct } from "./product.ts";

const mug: Product = { name: "Mug", price: 12 };

console.log(formatProduct(mug));
