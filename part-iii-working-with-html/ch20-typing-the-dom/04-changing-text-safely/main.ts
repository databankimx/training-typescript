const input = document.querySelector<HTMLInputElement>("#comment");
const preview = document.querySelector<HTMLDivElement>("#preview");

if (input !== null && preview !== null) {
  input.addEventListener("input", () => {
    preview.textContent = `Preview: ${input.value}`;
  });
}
