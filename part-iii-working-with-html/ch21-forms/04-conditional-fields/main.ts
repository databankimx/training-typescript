export {};

const delivery = document.querySelector<HTMLSelectElement>("#delivery");
const addressField = document.querySelector<HTMLLabelElement>("#address-field");
const address = document.querySelector<HTMLInputElement>("#address");
const status = document.querySelector<HTMLParagraphElement>("#status");

function refresh(select: HTMLSelectElement, field: HTMLElement, input: HTMLInputElement, note: HTMLElement): void {
  const needsAddress = select.value === "post";
  field.classList.toggle("hidden", !needsAddress);
  input.required = needsAddress;
  note.textContent = needsAddress
    ? "Enter an address for postal delivery."
    : "Pick up at the shop. No address needed.";
}

if (delivery !== null && addressField !== null && address !== null && status !== null) {
  refresh(delivery, addressField, address, status);
  delivery.addEventListener("change", () => {
    refresh(delivery, addressField, address, status);
  });
}
