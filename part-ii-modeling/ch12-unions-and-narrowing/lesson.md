# Ch12 - Unions and narrowing

Real values are often one of several things. An ID might be a number from an old system or text from a new one. A form field might hold a name, or nothing at all. A status might be open, closed, or pending. A **union** type says a value can be one of several types, and **narrowing** is how the program checks which one it has, so it can use the value safely. The checker follows each check, and only allows the operations that suit the type the value has at that point.

## What you'll learn

1. How a union type lists the possible types of a value.
2. How `typeof` narrows a union, so the checker knows which type is in use.
3. How null checks and truthiness checks narrow a value that might be missing.
4. How literal unions name a fixed set of values, and how `switch` covers each one.

The chapter ends with a summary, and two homework exercises.
