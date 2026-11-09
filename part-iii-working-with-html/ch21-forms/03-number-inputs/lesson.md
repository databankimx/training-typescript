# Number inputs and formatting

A number field holds text in the form, but it can also give its value as a number. `valueAsNumber` does that conversion, and it returns `NaN` (not a number) when the field is empty or holds something that isn't a number. The script checks for that case before formatting the amount.

> **Coming from JavaScript:** `valueAsNumber`, `toFixed`, and `Number.isNaN` are the same in both languages. The `number` type on the result is the TypeScript part.

## The program

The page has a number field holding `12.5`, and a paragraph for the result. The script is in `main.ts`:

```ts
const amount = document.querySelector<HTMLInputElement>("#amount");
const shown = document.querySelector<HTMLParagraphElement>("#shown");

function showAmount(input: HTMLInputElement, output: HTMLParagraphElement): void {
  const price: number = input.valueAsNumber;
  output.textContent = Number.isNaN(price) ? "No amount entered" : `$${price.toFixed(2)}`;
}

if (amount !== null && shown !== null) {
  showAmount(amount, shown);
  amount.addEventListener("input", () => {
    showAmount(amount, shown);
  });
}
```

Press **Run**. The paragraph shows `$12.50`, because `toFixed(2)` always gives two decimal places. Clear the field, and it changes to `No amount entered`.

- **`valueAsNumber`** reads the field as a number. It's typed `number`, so `toFixed` is allowed on it.
- **`Number.isNaN`** is the check for the empty case. `NaN` is the only value that isn't equal to itself, so `===` can't be used to find it.
- **The `input` event** runs the function on every change, so the paragraph stays in step with the field.

## Why the function takes the elements

`showAmount` receives the input and the output as parameters, instead of looking them up itself. The `if` narrows both elements before the call, so the function can rely on them being present. A parameter with a type like `HTMLInputElement` keeps that promise visible in the signature.

## Try it

- Change the value attribute to `7`, and run. What does the paragraph show?
- Type a minus sign on its own into the field. What does the paragraph show, and why?
- Change `toFixed(2)` to `toFixed(0)`, and check the result for `12.5`.

## Quiz

```quiz
What does `valueAsNumber` give when the number field is empty?
○ `0`
→ Not quite. An empty field doesn't become zero, so the program can tell it apart.
◉ `NaN`, which the program checks with `Number.isNaN`.
→ Right. `NaN` marks a field that holds no number, so the check can handle the empty case.
○ `""`
→ Not quite. That's the text value. `valueAsNumber` converts to a number, or gives `NaN`.
```

```quiz
Why is `Number.isNaN(price)` used, rather than `price === NaN`?
○ Because `NaN` cannot appear in a comparison.
→ Not quite. It can appear, but it isn't equal to anything, itself included.
◉ Because `NaN` is not equal to itself, so `===` never finds it.
→ Right. `Number.isNaN` is the reliable check for `NaN`.
○ Because `===` is slower than a function call.
→ Not quite. The reason is that `NaN` is never equal to anything.
```
