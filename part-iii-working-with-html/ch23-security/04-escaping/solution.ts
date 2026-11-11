export {};

// Turns the characters that give markup its meaning into entities, so the browser shows them as text.
function escapeHtml(text: string): string {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

const title = document.querySelector<HTMLInputElement>("#title");
const preview = document.querySelector<HTMLParagraphElement>("#preview");

if (title !== null && preview !== null) {
  preview.innerHTML = `<strong>${escapeHtml(title.value)}</strong>`;
}
