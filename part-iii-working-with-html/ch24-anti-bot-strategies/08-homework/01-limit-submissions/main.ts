export {};

const form = document.querySelector<HTMLFormElement>("#comment-form");
const comment = document.querySelector<HTMLTextAreaElement>("#comment");
const list = document.querySelector<HTMLUListElement>("#saved");
const status = document.querySelector<HTMLParagraphElement>("#status");

if (form !== null && comment !== null && list !== null && status !== null) {
  // TODO: allow at most two submissions in thirty seconds. Keep the timestamps in a typed list, as the server did.

  form.addEventListener("submit", (event: SubmitEvent) => {
    event.preventDefault();
    const text: string = comment.value.trim();
    if (text === "") {
      status.textContent = "Write something first.";
      return;
    }

    const item = document.createElement("li");
    item.textContent = text;
    list.append(item);
    comment.value = "";
    status.textContent = "Thanks for your comment.";
  });
}
