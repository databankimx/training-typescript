export {};

const form = document.querySelector<HTMLFormElement>("#comment-form");
const comment = document.querySelector<HTMLTextAreaElement>("#comment");
const honeypot = document.querySelector<HTMLInputElement>("#website");
const list = document.querySelector<HTMLUListElement>("#saved");
const status = document.querySelector<HTMLParagraphElement>("#status");
const botButton = document.querySelector<HTMLButtonElement>("#bot");

if (form !== null && comment !== null && honeypot !== null && list !== null && status !== null && botButton !== null) {
  const saved: string[] = [];

  const save = (text: string): void => {
    saved.push(text);
    const item = document.createElement("li");
    item.textContent = text;
    list.append(item);
  };

  form.addEventListener("submit", (event: SubmitEvent) => {
    event.preventDefault();
    const text: string = comment.value.trim();
    if (text === "") {
      status.textContent = "Write something first.";
      return;
    }

    // People never see the honeypot, so they never fill it in. Any text here means a script filled in every field.
    // The comment is dropped, but the reply is the same one a person would get, so the trap stays hidden.
    if (honeypot.value !== "") {
      status.textContent = "Thanks for your comment.";
      comment.value = "";
      honeypot.value = "";
      return;
    }

    save(text);
    status.textContent = "Thanks for your comment.";
    comment.value = "";
  });

  botButton.addEventListener("click", () => {
    comment.value = "Cheap watches, click here";
    honeypot.value = "https://spam.example";
    form.requestSubmit();
  });
}
