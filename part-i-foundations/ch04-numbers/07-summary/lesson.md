## Summary: Numbers

A short review of the chapter's ideas, and a few questions. Nothing here requires a calculator, though you may want one for the last question.

These are the basic ideas from this chapter.

* **A number is a value you can calculate with.** Whole numbers and decimals share the type `number`.
* **Rounding gives you the whole number you need.** `Math.round`, `Math.floor`, and `Math.ceil` each round in a different direction.
* **Decimals are stored approximately.** A sum like `0.1 + 0.2` can be slightly wrong, so money is kept in whole cents.
* **Numbers can be written in other bases.** `0b` means binary, `0x` means hexadecimal, and `toString` writes a number as text in another base.
* **Text must be converted before you calculate with it.** `Number`, `parseInt`, and `parseFloat` do that, and `NaN` means the text wasn't a number.
* **`Math` holds ready-made calculations.** Its functions are called with a dot, and `Math.PI` is a constant.

### Check your understanding

*These questions are written for this course.*

```quiz
A form sends the text `"19.50"`. Which line turns it into a number you can add to another number?
○ text + 1
→ Not quite. That joins the characters, so the result is text.
◉ Number(text) + 1
→ Right. `Number` converts the text first, so the addition works on numbers.
○ text.toFixed(2)
→ Not quite. `toFixed` works on numbers, and it gives back text.
```

```quiz
Why is money kept in whole cents in a program?
○ Because the checker only accepts whole numbers.
→ Not quite. The checker accepts decimals.
◉ Because adding whole numbers is exact, so totals don't drift from storage errors.
→ Right. Whole-number arithmetic avoids the small errors that decimals can have.
○ Because cents are easier to read.
→ Not quite. The reason is accuracy in the calculation.
```

```quiz
What does `Math.floor(7.9)` give you?
○ 8
→ Not quite. `floor` always goes down, even when the decimal part is large.
◉ 7
→ Right. `floor` goes down to the whole number below.
○ 7.9
→ Not quite. `floor` gives a whole number.
```
