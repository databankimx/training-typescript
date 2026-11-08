# Hello, world!

> **Coming from JavaScript:** this is the same `console.log` you'd write in JavaScript. The only difference is the file extension, `.ts`.

**Before you start:** complete the Setup step. You don't need any programming experience for this one.

Every programming course starts with a program that prints `Hello, world!`. It's short, and it's the first time your computer does something because you told it to.

## What is a program?

A **program** is a text file of instructions. The computer reads the instructions from top to bottom and carries them out, one at a time. The text you see in the Source tab is a program.

## The program

The program is already in `main.ts`, so you don't need to type it:

```ts
console.log("Hello, world!");
```

Each part has a job:

- **`console.log`** is an instruction that shows text on the screen. `console` is the place the output goes, and `log` is the action.
- **The brackets, `( )`,** hold what you want to show.
- **`"Hello, world!"`** is the text. The quotes mark where the text starts and ends. They tell the computer that this is text, and they don't appear in the output.
- **The semicolon, `;`,** ends the instruction. It works like a full stop at the end of a sentence.

## Run it

Press **Run**. The output appears in the OUTPUT pane, above the input box:

```
Hello, world!
The program finished with exit code 0.
```

The exit code is the program's result. `0` means it finished without problems.

## Check it

Press **Check**. It should say `Check passed: no errors.`

Run and Check do different jobs. **Run** starts the program and shows what it does. **Check** reads the program and looks for mistakes, without running it. A program can run without an error and still have a mistake, so it's worth checking as well.

## Make a mistake on purpose

Learning to read a mistake is part of learning to program, so let's make one. The rules for writing a language are called its **syntax**. Syntax works like grammar: every opening bracket needs a closing one.

Delete the closing `)` at the end of the line, so it reads:

```ts
console.log("Hello, world!";
```

Press **Check**. It reports a message similar to this:

```
main.ts:1:25 - error: ')' expected.
```

Read the first part of the message. It says where the mistake is (line 1), and what the checker expected (a closing bracket). Now press **Run**. The program doesn't start at all, because the computer can't follow the instruction.

Put the `)` back, and check again. It should pass.

## Try it

- Change the text between the quotes, and run the program again.
- Add a second `console.log` line below the first. Which line appears first in the output?
- Put `//` at the start of a line. Run it. The line isn't shown, because a line starting with `//` is a comment, and the program skips it. Remove the `//` again.

## Quiz

```quiz
What does `console.log` do?
○ It saves the text to a file.
→ Not quite. The text is shown on the screen, and nothing is saved.
◉ It shows what you give it on the screen.
→ Right. The output appears in the OUTPUT pane when you press Run.
○ It checks the text for mistakes.
→ Not quite. That's the job of Check, which doesn't run the program.
```

```quiz
What does the semicolon at the end of the line do?
○ It makes the text print in bold.
→ Not quite. The semicolon doesn't change how the text looks.
◉ It marks the end of an instruction, like a full stop.
→ Right. It tells the computer where one instruction stops and the next one starts.
○ It starts the program.
→ Not quite. The program starts when you press Run.
```

```quiz
Which line will show `Hello, world!` in the output, with no quote marks?
◉ console.log("Hello, world!");
→ Right. The quotes are part of the instruction, and aren't shown in the output.
○ console.log('"Hello, world!"');
→ Not quite. That shows the quote marks, because they're inside the text.
○ console.log(Hello, world!);
→ Not quite. Without quotes, the computer tries to read `Hello` and `world` as names, and that's a mistake.
```
