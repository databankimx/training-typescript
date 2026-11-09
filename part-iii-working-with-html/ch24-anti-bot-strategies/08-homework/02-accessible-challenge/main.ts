export {};

const form = document.querySelector<HTMLFormElement>("#challenge-form");
const answer = document.querySelector<HTMLInputElement>("#answer");
const feedback = document.querySelector<HTMLParagraphElement>("#feedback");

// The question is fixed so the exercise is predictable. The answer is 12.
const EXPECTED: number = 12;

if (form !== null && answer !== null && feedback !== null) {
  form.addEventListener("submit", (event: SubmitEvent) => {
    event.preventDefault();

    // TODO: link the answer field to the hint with aria-describedby, in the HTML.
    // TODO: make the feedback paragraph a polite live region, in the HTML, so a wrong answer is announced.

    if (Number(answer.value.trim()) === EXPECTED) {
      feedback.textContent = "Correct. Thank you.";
    } else {
      feedback.textContent = "That answer is not right. Try again.";
    }
  });
}
