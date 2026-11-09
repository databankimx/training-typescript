const filter = document.querySelector<HTMLInputElement>("#filter");
const list = document.querySelector<HTMLUListElement>("#items");

if (filter !== null && list !== null) {
  filter.addEventListener("input", () => {
    const text = filter.value.trim().toLowerCase();
    for (const item of Array.from(list.querySelectorAll<HTMLLIElement>("li"))) {
      const name = (item.textContent ?? "").toLowerCase();
      item.classList.toggle("hidden", !name.includes(text));
    }
  });
}
