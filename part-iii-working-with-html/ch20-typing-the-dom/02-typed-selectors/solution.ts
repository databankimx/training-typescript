const input = document.querySelector<HTMLInputElement>("#name");
const output = document.querySelector<HTMLParagraphElement>("#output");

if (input !== null && output !== null) {
  output.textContent = `Hello, ${input.value || "stranger"}!`;
}
