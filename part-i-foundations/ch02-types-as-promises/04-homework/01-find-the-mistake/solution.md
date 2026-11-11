# Worked reasoning: find the mistake before it runs

## Why the output is `02053`

`reduce` starts with the number `0`. The first step is `0 + "20"`. When one side of `+` is a string, JavaScript converts the other side to text and joins them, so the result is `"020"`. Each later step does the same, and the running total stays text: `"020" + "5"` is `"0205"`, and `"0205" + "3"` is `"02053"`.

Nothing in the code is wrong, as far as JavaScript can tell. The mistake is in the data, and JavaScript has no way to object to the data.

## Why TypeScript catches it

The annotation `prices: number[]` says that the function expects an array of numbers. The call passes `["20", "5", "3"]`, which is an array of strings. The checker reports each string separately, because each one is a value the parameter's type doesn't allow. Nothing has run yet, so the errors are about the code's meaning, not about what happened.

The return annotation `: number` does a second job. It stops the function from quietly returning something else later, such as the text version of the total.

## Why Node still runs the file

Node removes the annotations from the file and runs what's left. It doesn't compare the types with the values. That's a sensible design, because checking happens in a separate step, and running stays fast. It also means a file can run successfully and still contain a type error, which is the trap this lesson is built around.

## Where the fix belongs

The fix isn't to write `Number(price)` inside `cartTotal`, because that would hide the problem. The strings come from the form, so the conversion belongs at that boundary, where the data arrives. The function can then keep its promise: it only ever receives numbers.

Later lessons come back to this. Chapter 15 covers data that arrives from outside the program, and why a type annotation can't check it on its own.
