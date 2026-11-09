# Ch13 · Unknown and any

Some values arrive from outside the program: a file, a form, a web request, a value a library returns. The program doesn't know their type, and the honest answer is to say so. TypeScript gives you two types for that. `unknown` says a value could be anything, and the checker makes you prove what it is before you use it. `any` switches the checker off for a value entirely. Both are useful, and both can hide mistakes, so this chapter shows when each belongs.

## What you'll learn

1. How `unknown` holds any value, and why the checker refuses to use it until you narrow it.
2. How to narrow an `unknown` value, with `typeof` and with your own checks.
3. What `any` does, and why it weakens every promise the types would otherwise make.

The chapter ends with a summary, and two homework exercises.
