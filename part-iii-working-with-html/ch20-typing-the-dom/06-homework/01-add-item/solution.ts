export {};

const input = document.querySelector<HTMLInputElement>("#item");
const add = document.querySelector<HTMLButtonElement>("#add");
const list = document.querySelector<HTMLUListElement>("#list");

if (input !== null && add !== null && list !== null) {
  add.addEventListener("click", () => {
    const entry = document.createElement("li");
    entry.textContent = input.value;
    list.append(entry);
    input.value = "";
  });
}
