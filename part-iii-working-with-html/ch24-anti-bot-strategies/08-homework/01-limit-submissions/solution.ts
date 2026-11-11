export {};

const form = document.querySelector<HTMLFormElement>("#comment-form");
const comment = document.querySelector<HTMLTextAreaElement>("#comment");
const list = document.querySelector<HTMLUListElement>("#saved");
const status = document.querySelector<HTMLParagraphElement>("#status");

if (form !== null && comment !== null && list !== null && status !== null) {
  const WINDOW_MILLISECONDS: number = 30000;
  const LIMIT: number = 2;
  const recentSubmissions: number[] = [];

  form.addEventListener("submit", (event: SubmitEvent) => {
    event.preventDefault();
    const text: string = comment.value.trim();
    if (text === "") {
      status.textContent = "Write something first.";
      return;
    }

    const now: number = Date.now();
    const recent: number[] = recentSubmissions.filter((time: number) => now - time < WINDOW_MILLISECONDS);
    recentSubmissions.splice(0, recentSubmissions.length, ...recent);

    if (recent.length >= LIMIT) {
      status.textContent = "Please wait a while before sending another comment.";
      return;
    }

    recentSubmissions.push(now);
    const item = document.createElement("li");
    item.textContent = text;
    list.append(item);
    comment.value = "";
    status.textContent = "Thanks for your comment.";
  });
}
