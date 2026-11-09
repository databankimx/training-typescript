const form = document.querySelector<HTMLFormElement>("#order");
const quantity = document.querySelector<HTMLInputElement>("#quantity");
const result = document.querySelector<HTMLParagraphElement>("#result");

if (form !== null && quantity !== null && result !== null) {
  form.addEventListener("submit", (event: SubmitEvent) => {
    event.preventDefault();
    const count: number = quantity.valueAsNumber;
    if (Number.isNaN(count) || count < 1) {
      result.textContent = "Quantity must be at least 1";
    } else {
      result.textContent = `Ordering ${count}`;
    }
  });
}
