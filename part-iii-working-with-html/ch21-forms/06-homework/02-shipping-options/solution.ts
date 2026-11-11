export {};

const shipping = document.querySelector<HTMLSelectElement>("#shipping");
const note = document.querySelector<HTMLParagraphElement>("#note");

function showNote(choice: HTMLSelectElement, output: HTMLParagraphElement): void {
  output.textContent = choice.value === "express" ? "Express: arrives in 1 day" : "Standard: arrives in 5 days";
}

if (shipping !== null && note !== null) {
  showNote(shipping, note);
  shipping.addEventListener("change", () => {
    showNote(shipping, note);
  });
}
