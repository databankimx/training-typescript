interface Product {
  name: string;
  price: number;
}

const products: Product[] = [
  { name: "Pens", price: 3 },
  { name: "Paper", price: 5 },
  { name: "Pencils", price: 2 },
];

const sort = document.querySelector<HTMLSelectElement>("#sort");
const list = document.querySelector<HTMLUListElement>("#items");

function sortedCopy(choice: HTMLSelectElement): Product[] {
  const copy: Product[] = [...products];
  if (choice.value === "price") {
    copy.sort((a: Product, b: Product) => a.price - b.price);
  } else {
    copy.sort((a: Product, b: Product) => a.name.localeCompare(b.name));
  }
  return copy;
}

function render(target: HTMLUListElement, items: Product[]): void {
  target.replaceChildren(
    ...items.map((product: Product) => {
      const row = document.createElement("li");
      row.textContent = `${product.name}: ${product.price}`;
      return row;
    }),
  );
}

if (sort !== null && list !== null) {
  render(list, sortedCopy(sort));
  sort.addEventListener("change", () => {
    render(list, sortedCopy(sort));
  });
}
