const button = document.querySelector<HTMLButtonElement>("#count");
const total = document.querySelector<HTMLParagraphElement>("#total");

let clicks: number = 0;

if (button !== null && total !== null) {
  button.addEventListener("click", (event: MouseEvent) => {
    clicks = clicks + 1;
    total.textContent = `Clicks: ${clicks}`;
  });
}
