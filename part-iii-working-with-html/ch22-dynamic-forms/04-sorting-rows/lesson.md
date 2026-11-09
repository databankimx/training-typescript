# Sorting rows

Sorting is easiest when the data is kept apart from the page. The products live in an array, and the page is drawn from that array. To sort, the script takes a copy, sorts the copy, and draws the rows again from it. The page can then never disagree with the data, because the rows are always built from it.

> **Coming from JavaScript:** `sort`, `localeCompare`, and `replaceChildren` are the same in both languages. The `Product` interface and the `Product[]` labels are the TypeScript part.

## The program

The products are in an array, and a select chooses the order. The script is in `main.ts`:

```ts
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
```

Press **Run**. The rows start in name order, so the first row is `Paper: 5`. Change the select to Price, and the rows reorder to Pencils, Pens, Paper.

- **`[...products]`** makes a copy. `sort` changes the array it's called on, so sorting the original would change the data for every later sort.
- **`sort` with a comparison function** orders the copy. For numbers, `a.price - b.price` is negative when `a` comes first. For text, `localeCompare` does the same.
- **`replaceChildren`** removes the old rows and adds the new ones in one step.

## Why redraw rather than move rows

The rows could be moved into a new order, but then the page would hold the order instead of the data. Redrawing from a sorted copy means the data is the single source of truth, and the page only ever shows a view of it.

## Try it

- Add a product, `{ name: "Rulers", price: 4 }`, to the array, and check that it appears in both orders.
- Change `copy.sort` to `products.sort` in the price branch. Choose Price, then Name. Are the rows still in the right order, and why?
- Change `a.price - b.price` to `b.price - a.price`. What order do the rows show?

## Quiz

```quiz
Why does `sortedCopy` copy the array before sorting it?
○ Because `sort` cannot be used on arrays of objects.
→ Not quite. `sort` works on arrays of objects, as long as a comparison is given.
◉ Because `sort` changes the array it is called on, so sorting the original would alter the data.
→ Right. Sorting a copy leaves the products array in its original order for every later sort.
○ Because the copy is faster to sort.
→ Not quite. The reason is keeping the data unchanged.
```

```quiz
What does `a.price - b.price` tell `sort` when it is negative?
○ That `a` should come after `b`.
→ Not quite. A negative result means `a` comes before `b`.
◉ That `a` should come before `b`.
→ Right. A negative comparison puts the first item first, so the cheaper product appears earlier.
○ That the two prices are equal.
→ Not quite. Equal prices give zero, not a negative result.
```
