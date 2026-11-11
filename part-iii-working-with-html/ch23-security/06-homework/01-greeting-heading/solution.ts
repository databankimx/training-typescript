export {};

function escapeHtml(text: string): string {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

const name = document.querySelector<HTMLInputElement>("#name");
const heading = document.querySelector<HTMLDivElement>("#heading");

if (name !== null && heading !== null) {
  heading.innerHTML = `<h2>Hello, ${escapeHtml(name.value)}</h2>`;
}
