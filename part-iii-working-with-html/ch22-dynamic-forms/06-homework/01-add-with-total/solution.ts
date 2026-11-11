export {};

const form = document.querySelector<HTMLFormElement>("#add-form");
const name = document.querySelector<HTMLInputElement>("#name");
const price = document.querySelector<HTMLInputElement>("#price");
const list = document.querySelector<HTMLUListElement>("#items");
const total = document.querySelector<HTMLParagraphElement>("#total");

let sum: number = 0;

if (form !== null && name !== null && price !== null && list !== null && total !== null) {
  form.addEventListener("submit", (event: SubmitEvent) => {
    event.preventDefault();
    const amount: number = price.valueAsNumber;
    if (name.value.trim() === "" || Number.isNaN(amount)) {
      return;
    }
    sum = sum + amount;
    const row = document.createElement("li");
    row.textContent = `${name.value.trim()}: ${amount.toFixed(2)}`;
    list.append(row);
    total.textContent = `Total: ${sum}`;
    name.value = "";
    price.value = "";
  });
}
