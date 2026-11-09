const toggle = document.querySelector<HTMLButtonElement>("#toggle");
const message = document.querySelector<HTMLParagraphElement>("#message");

if (toggle !== null && message !== null) {
  toggle.addEventListener("click", () => {
    message.classList.toggle("hidden");
  });
}
