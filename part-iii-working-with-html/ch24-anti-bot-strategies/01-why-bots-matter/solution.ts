export {};

const form = document.querySelector<HTMLFormElement>("#comment-form");
const comment = document.querySelector<HTMLTextAreaElement>("#comment");
const list = document.querySelector<HTMLUListElement>("#saved");
const status = document.querySelector<HTMLParagraphElement>("#status");
const botButton = document.querySelector<HTMLButtonElement>("#bot");

if (form !== null && comment !== null && list !== null && status !== null && botButton !== null) {
  const saved: string[] = [];

  const save = (text: string): void => {
    saved.push(text);
    const item = document.createElement("li");
    item.textContent = text;
    list.append(item);
    status.textContent = `Saved ${saved.length} comment(s).`;
  };

  form.addEventListener("submit", (event: SubmitEvent) => {
    event.preventDefault();
    const text: string = comment.value.trim();
    if (text === "") {
      status.textContent = "Write something first.";
      return;
    }
    save(text);
    comment.value = "";
  });

  // A script that fills in the form and submits it. The submit handler cannot tell it apart from a person.
  botButton.addEventListener("click", () => {
    comment.value = "Cheap watches, click here";
    form.requestSubmit();
  });
}
