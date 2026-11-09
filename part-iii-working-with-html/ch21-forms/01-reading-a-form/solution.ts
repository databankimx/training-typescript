const form = document.querySelector<HTMLFormElement>("#order");
const summary = document.querySelector<HTMLParagraphElement>("#summary");

if (form !== null && summary !== null) {
  form.addEventListener("submit", (event: SubmitEvent) => {
    event.preventDefault();
    const data = new FormData(form);
    const quantity = data.get("quantity");
    const size = data.get("size");
    summary.textContent = `${quantity} x ${size}`;
  });
}
