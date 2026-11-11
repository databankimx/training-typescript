# Worked reasoning: Hello, world!

## Why the program is one line

The program has no functions, no types, and no imports, so there's nothing else to explain yet. Chapter 2 starts adding types, and the same `console.log` line stays useful for checking what a value looks like.

## Why Node runs a `.ts` file

Node 24 removes the type annotations from a `.ts` file and runs what's left. That's why `node main.ts` works without a build step. The trade-off is that Node doesn't check types, so the checker is a separate step. Chapter 2's first lesson shows what that means in practice.

## Why the missing parenthesis gives two messages

Both tools read the same file, but they do different jobs. The checker parses the file as TypeScript, notices that the call never closes, and reports it. Node parses the file as JavaScript for the same reason, and refuses to start. They agree here because a missing parenthesis is a syntax error, which is the same in both languages.

Type errors are different. Node doesn't report them at all, which is why the checker matters more than it first appears.
