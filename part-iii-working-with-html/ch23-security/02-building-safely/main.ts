export {};

const name = document.querySelector<HTMLInputElement>("#name");
const add = document.querySelector<HTMLButtonElement>("#add");
const names = document.querySelector<HTMLUListElement>("#names");

if (name !== null && add !== null && names !== null) {
  add.addEventListener("click", () => {
    const row = document.createElement("li");
    row.textContent = name.value;
    names.append(row);
  });
}
