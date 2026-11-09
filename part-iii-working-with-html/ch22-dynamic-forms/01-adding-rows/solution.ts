const add = document.querySelector<HTMLButtonElement>("#add");
const list = document.querySelector<HTMLUListElement>("#items");

let count: number = 0;

if (add !== null && list !== null) {
  add.addEventListener("click", () => {
    count = count + 1;
    const item = document.createElement("li");
    item.textContent = `Item ${count}`;
    list.append(item);
  });
}
