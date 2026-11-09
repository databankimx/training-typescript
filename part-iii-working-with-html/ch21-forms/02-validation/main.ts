const form = document.querySelector<HTMLFormElement>("#signup");
const email = document.querySelector<HTMLInputElement>("#email");
const message = document.querySelector<HTMLParagraphElement>("#message");

if (form !== null && email !== null && message !== null) {
  form.addEventListener("submit", (event: SubmitEvent) => {
    event.preventDefault();
    if (email.checkValidity()) {
      message.textContent = `Thanks, we will write to ${email.value}.`;
    } else {
      message.textContent = "Please enter a valid email address.";
    }
  });
}
