# An arithmetic challenge

A challenge asks a question that is cheap for a person and inconvenient for a script. The traditional name for this family of tools is CAPTCHA. The arithmetic challenge here is a small, self-made version. It shows the mechanism clearly, and it shows where the mechanism runs out.

No real CAPTCHA service is used here. The public ones need network access and site keys, and they only work correctly when the server verifies the answer. They are described at the end of this step.

> **Coming from JavaScript:** the question and the expected answer are ordinary numbers and strings. The typed `let expected: number` makes the comparison's types explicit, so a text answer can never be compared with the sum by accident.

## Ask a question, check the answer

The script chooses two numbers, builds the question, and keeps the expected answer:

```typescript
const newQuestion = (): void => {
  const first: number = randomInt(2, 19);
  const second: number = randomInt(2, 19);
  expected = first + second;
  question.textContent = `What is ${first} + ${second}?`;
  answer.value = "";
};
```

The check compares the typed answer with that number:

```typescript
const given: string = answer.value.trim();
if (given === "" || Number(given) !== expected) {
  status.textContent = "That answer is not right. Try again.";
  return;
}
```

```text
That answer is not right. Try again.
```

`Number(given)` returns `NaN` for text such as `seven`, and `NaN` never equals anything, so a non-number is refused. The empty check comes first because `Number("")` is `0`, which could match a question whose answer is zero.

Unlike the honeypot and timing checks, this one talks to the person. A challenge that fails silently leaves an honest user wondering what they did wrong.

## Each answer works once

After a comment is accepted, the script asks a new question. A bot that solves one challenge should not be able to reuse the answer on every later submission.

## Where this breaks down

A sum of two small numbers is easy to solve with a few lines of code, a calculator, or a text recognizer. The challenge proves only that something can read the text on the screen. Real CAPTCHAs make this harder with distorted images, audio, or behavioural signals, and they still get broken.

Challenges also cost people. They slow honest visitors down, and they are hard for people using screen readers, and for people with some reading or visual difficulties. Design the challenge for the audience first, and treat difficulty for bots as a secondary goal.

## Real CAPTCHA services

Services such as reCAPTCHA, hCaptcha, and Cloudflare Turnstile load their own script into your page. They decide, using signals from the browser and their own models, whether a visitor is likely to be a person, and they hand your form a token. Your server then sends that token, with a secret key, to the service's verification endpoint. The browser alone cannot be trusted to report that the check passed. That server step is the part that matters, and it is why this course describes these services rather than using them.

## Try it

- Press Simulate a bot. The comment is refused with the answer message. Why does the bot fail here, when the honeypot and timing steps gave no error?
- Submit a correct answer, then submit a second comment with the same answer. What happens, and why?

## Quiz

```quiz
What does `Number("")` give, and why does the empty check come first?
○ `NaN`, so the empty check is not needed.
→ Not quite. `Number("")` gives `0`, not `NaN`.
◉ `0`, which could match a question whose answer is zero, so empty input is refused first.
→ Right. An empty answer must never reach the comparison.
○ An error, so the check is needed to stop the program crashing.
→ Not quite. It does not throw. It returns `0`.
```

```quiz
Why is a challenge answer checked on the server for a real CAPTCHA service?
○ Because the browser cannot display a question.
→ Not quite. The browser can display questions perfectly well.
◉ Because a browser can be made to report that a check passed, whatever the real result was.
→ Right. A result the page can rewrite is not a result you can rely on.
○ Because servers are faster at arithmetic.
→ Not quite. Speed is not the issue.
```
