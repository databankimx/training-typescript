# Reading errors

Every programmer spends a surprising part of the day staring at error messages. Nobody enjoys it, but the ones who get good at it are the ones who read the first line first. This step teaches that habit, starting with a mistake you make on purpose.

> **Coming from JavaScript:** the `: number` labels are the TypeScript part. Node ignores them when it runs the program, which is why Run still prints `42`.

Mistakes are normal, and every programmer makes them many times a day. What matters is being able to read the message a tool gives you. This step shows you how.

## The program

The program in `main.ts` doubles a number. It's the first time you've seen a **function**, so here's what the pieces mean:

```ts
function double(n: number): number {
  return n * 2;
}

console.log(double(21));
```

- A **function** is a named set of instructions. This one is called `double`.
- **`n`** is an **input**, called a parameter. It's a box for the value you give the function.
- **`: number`** after `n` is a label that says what kind of value the box should hold. In this case, a number. Chapter 2 explains these labels in more detail.
- **`return n * 2;`** gives the result back to whoever called the function.
- **`double(21)`** calls the function with `21`, so the output is `42`.

Press **Run**. You should see `42`.

## Mistake 1: the wrong kind of value

Change the last line to pass text instead of a number:

```ts
console.log(double("21"));
```

Press **Check**. The checker reports a message like this:

```
main.ts:5:20 - error TS2345: Argument of type 'string' is not assignable to parameter of type 'number'.
```

Read it in pieces:

- **`main.ts:5:20`** is the file, the line, and the column. This tells you exactly where to look.
- **`TS2345`** is the checker's code for this kind of mistake. You can search for it if you need more help.
- **The message** says what was expected, and what was given: a number was expected, and text was given.

Now press **Run**. The program still prints `42`. Node doesn't check the kind of value, so it quietly does the calculation. This is why a program can run and still be wrong. Put the number back, and check again.

## Mistake 2: broken syntax

Put `21` back, then delete the closing `}` of the function. Press **Check**. The checker reports that the file ends before the function is finished.

Press **Run**. This time the program doesn't start at all, and Node shows:

```
SyntaxError: Unexpected end of input
```

A **syntax** mistake breaks the rules for writing the language, so nothing can run. A type mistake breaks a promise about the values, so the checker can see it but Node can't.

Put the `}` back, and check again.

## Read the first line first

Whatever the message, read its first line first. It says what the tool expected, and where it was looking. The lines after it usually repeat the same idea in more detail.

## Try it

- Change `return n * 2;` to `return "two"`, and press **Check**. Which kind of mistake is it?
- Put a bracket in the wrong place, such as `console.log(double(21);`. Is it a syntax mistake or a type mistake?

## Quiz

```quiz
A program runs and prints a wrong answer, but Check reports no errors. What is the most likely cause?
○ Node has a bug.
→ Not quite. Node is working correctly here. The problem is in the program.
◉ The mistake is in the logic, such as using the wrong calculation.
→ Right. The checker can see the types and the syntax, but it can't tell whether your calculation is what you meant.
○ The file has the wrong name.
→ Not quite. A file name doesn't change the result of a calculation.
```

```quiz
Which mistake stops the program from starting at all?
○ Passing text where a number is expected.
→ Not quite. Node doesn't check types, so it runs the program anyway.
◉ A missing closing brace.
→ Right. Node can't follow instructions that break the rules of the language.
○ A comment with a typo in it.
→ Not quite. The computer ignores comments, so a typo in one doesn't matter.
```
