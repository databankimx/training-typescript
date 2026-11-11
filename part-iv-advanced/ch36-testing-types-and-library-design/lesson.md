# Ch36 - Testing types and library design

A library is code other people build on, and its types are its promise to them. Once a function's signature is published, changing it breaks every caller. This chapter covers two skills that protect that promise. The first is checking types themselves: writing assertions that fail the build when a type stops meaning what it should. The second is designing a public API: choosing overloads, defaults, and parameter shapes that make correct use easy and incorrect use hard.

Type tests run during the check, not when the program runs. So the lessons here show a passing result, and the real test is that the checker accepts the file. A failing type test is a compile error, which is exactly what you want to see when a type changes unexpectedly.

## What you'll learn

1. How to write a type equality test that fails when two types differ.
2. How overloads give a function different signatures for different inputs, while sharing one body.
3. How generic defaults and parameter shapes make a library function easy to call correctly.

The chapter ends with a summary, and a homework exercise.
