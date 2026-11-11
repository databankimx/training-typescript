export {};

const input = document.querySelector<HTMLInputElement>("#input");
const unsafe = document.querySelector<HTMLSpanElement>("#unsafe");
const safe = document.querySelector<HTMLSpanElement>("#safe");

if (input !== null && unsafe !== null && safe !== null) {
  const text: string = input.value;
  unsafe.innerHTML = text;
  safe.textContent = text;
}
