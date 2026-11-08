# Ch02 · Types as promises

Computers are very literal. They'll do exactly what you say, including the parts you didn't mean. A type is how you tell the checker what you meant, so it can spot the places where what you wrote and what you intended have drifted apart. This chapter is about making those promises explicit.

Every value in a program has a **type**. A type is the name for what kind of value something is. The two you've already met are:

- **Numbers**, such as `1300000`.
- **Text**, which the course calls a **string**, such as `"Dallas"`.

A type is a promise. When you say a value is a number, you're promising it will always be a number. The checker keeps track of those promises and tells you when one is broken. Node doesn't. It runs the program whether the promises hold or not.

In this chapter you'll learn how to write a type down, and how TypeScript can work out a type for you. Each step adds one idea, and each one ends with something you can check for yourself.

## What you'll learn

1. How to write a type on a function, so the promise is visible to the next reader.
2. How TypeScript works out a type from a value, so you don't have to write every type.
3. A homework exercise, where you find a broken promise yourself.
