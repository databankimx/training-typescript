export {};

const category = document.querySelector<HTMLSelectElement>("#category");
const list = document.querySelector<HTMLUListElement>("#items");
const count = document.querySelector<HTMLParagraphElement>("#count");

function applyFilter(choice: HTMLSelectElement, items: HTMLUListElement, report: HTMLParagraphElement): void {
  let shown: number = 0;
  for (const row of Array.from(items.querySelectorAll<HTMLLIElement>("li"))) {
    const matches = choice.value === "all" || row.dataset.category === choice.value;
    row.classList.toggle("hidden", !matches);
    if (matches) {
      shown = shown + 1;
    }
  }
  report.textContent = `Showing ${shown} ${shown === 1 ? "item" : "items"}`;
}

if (category !== null && list !== null && count !== null) {
  applyFilter(category, list, count);
  category.addEventListener("change", () => {
    applyFilter(category, list, count);
  });
}
