export {};

const form = document.querySelector<HTMLFormElement>("#comment-form");
const comment = document.querySelector<HTMLTextAreaElement>("#comment");
const list = document.querySelector<HTMLUListElement>("#saved");
const status = document.querySelector<HTMLParagraphElement>("#status");
const botButton = document.querySelector<HTMLButtonElement>("#bot");
const slowButton = document.querySelector<HTMLButtonElement>("#slow");

// The moment this page started. A person needs time to read the form and type, so a faster submission is suspicious.
const MIN_MILLISECONDS: number = 3000;
const openedAt: number = Date.now();

function wait(milliseconds: number): Promise<void> {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

if (form !== null && comment !== null && list !== null && status !== null && botButton !== null && slowButton !== null) {
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

    const elapsed: number = Date.now() - openedAt;
    if (elapsed < MIN_MILLISECONDS) {
      // The same neutral reply as the honeypot. The timing rule stays inside the script.
      status.textContent = "Thanks for your comment.";
      comment.value = "";
      return;
    }

    save(text);
    status.textContent = "Thanks for your comment.";
    comment.value = "";
  });

  botButton.addEventListener("click", () => {
    comment.value = "Cheap watches, click here";
    form.requestSubmit();
  });

  // Waits long enough to look like someone who read the form and typed a reply.
  slowButton.addEventListener("click", async () => {
    comment.value = "Thanks, this is useful.";
    await wait(MIN_MILLISECONDS + 500);
    form.requestSubmit();
  });
}
