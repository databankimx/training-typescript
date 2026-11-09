# Ch18 · Async

Many things take time: a file is read from a disk, a request goes to a server, a timer waits for a moment to pass. A program that stops and waits for each one would freeze the screen. Asynchronous code lets the program carry on with other work and come back when the result is ready. JavaScript represents that future result as a **promise**, and the `async` and `await` keywords let you write the code in a way that reads from top to bottom.

## What you'll learn

1. How a promise stands for a value that isn't ready yet, and how to use its result.
2. How `async` and `await` write asynchronous code that reads like ordinary code.
3. How a failed operation shows up as a rejected promise, and how to catch it.
4. How `Promise.all` waits for several operations at once.

The chapter ends with a summary, and two homework exercises.
