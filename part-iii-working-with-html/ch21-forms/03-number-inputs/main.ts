const amount = document.querySelector<HTMLInputElement>("#amount");
const shown = document.querySelector<HTMLParagraphElement>("#shown");

function showAmount(input: HTMLInputElement, output: HTMLParagraphElement): void {
  const price: number = input.valueAsNumber;
  output.textContent = Number.isNaN(price) ? "No amount entered" : `$${price.toFixed(2)}`;
}

if (amount !== null && shown !== null) {
  showAmount(amount, shown);
  amount.addEventListener("input", () => {
    showAmount(amount, shown);
  });
}
