export {};

const MIN_MILLISECONDS: number = 3000;
const openedAt: number = Date.now();

const form = document.querySelector<HTMLFormElement>("#comment-form");
const comment = document.querySelector<HTMLTextAreaElement>("#comment");
const honeypot = document.querySelector<HTMLInputElement>("#website");
const question = document.querySelector<HTMLParagraphElement>("#question");
const answer = document.querySelector<HTMLInputElement>("#answer");
const list = document.querySelector<HTMLUListElement>("#saved");
const status = document.querySelector<HTMLParagraphElement>("#status");
const botButton = document.querySelector<HTMLButtonElement>("#bot");
const carefulButton = document.querySelector<HTMLButtonElement>("#careful");

function wait(milliseconds: number): Promise<void> {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

if (form !== null && comment !== null && honeypot !== null && question !== null && answer !== null && list !== null && status !== null && botButton !== null && carefulButton !== null) {
  let expected: number = 0;

  const newQuestion = (): void => {
    const first: number = Math.floor(Math.random() * 18) + 2;
    const second: number = Math.floor(Math.random() * 18) + 2;
    expected = first + second;
    question.textContent = `What is ${first} + ${second}?`;
    answer.value = "";
  };

  // Neutral reply for the silent checks, so a trapped bot learns nothing about which check caught it.
  const neutral = (): void => {
    status.textContent = "Thanks for your comment.";
    comment.value = "";
  };

  form.addEventListener("submit", (event: SubmitEvent) => {
    event.preventDefault();
    const text: string = comment.value.trim();
    if (text === "") {
      status.textContent = "Write something first.";
      return;
    }

    // 1. The honeypot. Cheap, and silent.
    if (honeypot.value !== "") {
      neutral();
      return;
    }

    // 2. The timing check. Also silent.
    if (Date.now() - openedAt < MIN_MILLISECONDS) {
      neutral();
      return;
    }

    // 3. The challenge. The one check that speaks, because a person who misjudged the sum needs to know.
    const given: string = answer.value.trim();
    if (given === "" || Number(given) !== expected) {
      status.textContent = "That answer is not right. Try again.";
      return;
    }

    const item = document.createElement("li");
    item.textContent = text;
    list.append(item);
    neutral();
    newQuestion();
  });

  botButton.addEventListener("click", () => {
    comment.value = "Cheap watches, click here";
    honeypot.value = "https://spam.example";
    form.requestSubmit();
  });

  // A script that reads the question off the page and types the answer. It passes the challenge, and it waits out the
  // timing check. A question printed on the page is a question a script can read.
  carefulButton.addEventListener("click", async () => {
    comment.value = "Thanks, this is useful.";
    await wait(MIN_MILLISECONDS + 500);
    const numbers: number[] = (question.textContent ?? "").match(/\d+/g)?.map(Number) ?? [];
    if (numbers.length >= 2) {
      answer.value = String(numbers[0] + numbers[1]);
    }
    form.requestSubmit();
  });

  newQuestion();
}
