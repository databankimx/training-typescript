export {};

const form = document.querySelector<HTMLFormElement>("#comment-form");
const comment = document.querySelector<HTMLTextAreaElement>("#comment");
const question = document.querySelector<HTMLParagraphElement>("#question");
const answer = document.querySelector<HTMLInputElement>("#answer");
const newQuestionButton = document.querySelector<HTMLButtonElement>("#new-question");
const list = document.querySelector<HTMLUListElement>("#saved");
const status = document.querySelector<HTMLParagraphElement>("#status");
const botButton = document.querySelector<HTMLButtonElement>("#bot");

if (form !== null && comment !== null && question !== null && answer !== null && newQuestionButton !== null && list !== null && status !== null && botButton !== null) {
  // The answer to the question on screen. It lives in the script, not in the HTML.
  let expected: number = 0;

  // A whole number from min to max, inclusive.
  const randomInt = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1)) + min;

  const newQuestion = (): void => {
    const first: number = randomInt(2, 19);
    const second: number = randomInt(2, 19);
    expected = first + second;
    question.textContent = `What is ${first} + ${second}?`;
    answer.value = "";
  };

  form.addEventListener("submit", (event: SubmitEvent) => {
    event.preventDefault();
    const text: string = comment.value.trim();
    if (text === "") {
      status.textContent = "Write something first.";
      return;
    }

    // Number("") is 0, so an empty answer must be refused before the comparison.
    const given: string = answer.value.trim();
    if (given === "" || Number(given) !== expected) {
      status.textContent = "That answer is not right. Try again.";
      return;
    }

    const item = document.createElement("li");
    item.textContent = text;
    list.append(item);
    comment.value = "";
    status.textContent = "Thanks for your comment.";
    // Each challenge answers once, so a recorded answer cannot be reused.
    newQuestion();
  });

  newQuestionButton.addEventListener("click", newQuestion);

  botButton.addEventListener("click", () => {
    comment.value = "Cheap watches, click here";
    form.requestSubmit();
  });

  newQuestion();
}
