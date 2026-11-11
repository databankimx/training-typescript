# Ch17 - Error handling

Programs fail. A file is missing, a network request times out, a user types text where a number belongs. The question is not whether a failure happens, but whether the program notices it and responds in a deliberate way. This chapter covers the two tools JavaScript gives for that, `try` and `catch` with `throw`, and a third approach that many TypeScript programs prefer: returning a failure as a value, which the checker can make you handle.

## What you'll learn

1. How `try` and `catch` contain a failure, and why the error is typed `unknown`.
2. How to throw an error for a value that can't be used, and give it a useful message.
3. How `finally` runs cleanup whether or not a failure happened.
4. How a result type returns success or failure as a value, and how narrowing makes the failure case impossible to ignore.

The chapter ends with a summary, and two homework exercises.
