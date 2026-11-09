# Putting the checks together

We now have three client-side checks. Each catches something the others do not, and each has a weakness the others partly cover. This step puts them in one form, in an order that makes sense, and tests the combination against the bots we have built.

> **Coming from JavaScript:** the handler is the same code in both languages. The typed `number` variables and the `string[]` results from `match` are the TypeScript part, and they keep the arithmetic and the parsing honest.

## Order the checks by cost

The cheapest checks come first, so most unwanted traffic is turned away before the expensive work starts:

```typescript
if (honeypot.value !== "") {
  neutral();
  return;
}

if (Date.now() - openedAt < MIN_MILLISECONDS) {
  neutral();
  return;
}

const given: string = answer.value.trim();
if (given === "" || Number(given) !== expected) {
  status.textContent = "That answer is not right. Try again.";
  return;
}
```

The honeypot is one comparison. The timing check is a subtraction. The challenge asks the visitor to do something, so it comes last. A bot that fills the honeypot never sees the question.

## Reply quietly, except where it helps

The first two checks reply neutrally. The challenge replies with a message, because a person who misjudged the sum needs to know. That is a trade-off. Each message you show tells an attacker something, so show only what a legitimate visitor needs.

## Test the combination

- **Submit** with a sensible comment, a correct answer, and a pause before pressing it. The comment is saved.
- **Simulate a bot** fills the honeypot. The reply is neutral, and nothing is saved.
- **Simulate a careful bot** waits, reads the question off the page, and types the answer. It passes all three checks, and its comment is saved.

The third result is the lesson. Every check raised the cost of the attack, and none stopped a script that reads the page carefully. Anything the page shows, the page's script can read.

## Reading the question

The careful bot parses the question with a regular expression. `match` returns `null` when nothing matches, so the code handles that case explicitly:

```typescript
const numbers: number[] = (question.textContent ?? "").match(/\d+/g)?.map(Number) ?? [];
```

The `?.` and `??` operators stop the chain at the first missing value, and the `number[]` label is the promise that the result holds numbers.

## Try it

- Change the order so the challenge comes before the honeypot. What does a bot see now?
- Remove the timing check. Which button now saves a comment that it should not?

## Quiz

```quiz
Why is the honeypot checked before the challenge?
○ Because the honeypot is more important.
→ Not quite. The reason is cost, not importance.
◉ Because the honeypot costs almost nothing to check, and a bot that fills it never reaches the question.
→ Right. Cheap checks first keep the expensive work for traffic that passes them.
○ Because the challenge cannot run after the honeypot.
→ Not quite. It can run in either order. The order is a choice about cost.
```

```quiz
What does `match(/\d+/g)?.map(Number) ?? []` give when the question has no numbers?
○ An error, because `match` returned `null`.
→ Not quite. The `?.` and `??` operators handle `null` without an error.
◉ An empty array, so the `numbers.length` check guards the next line.
→ Right. The chain stops at the missing value, and the fallback is an empty list.
○ The number `0`.
→ Not quite. The result is an array, not a number.
```
