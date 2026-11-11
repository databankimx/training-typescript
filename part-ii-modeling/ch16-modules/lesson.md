# Ch16 - Modules

A real program is too big for one file. Code is split across files, each one a **module** that exports the names it wants to share and keeps the rest private. A module can then be imported wherever it's needed, so the greeting rules live in one place, the pricing rules in another, and the main program only connects them. This chapter covers how modules export and import, how type-only imports keep the types out of the running program, and how a module's boundary decides what the rest of the program may see.

## What you'll learn

1. How a module exports functions and values, and how another file imports them.
2. How `import type` brings in a type without bringing in any code.
3. How a module's boundary hides what it doesn't export, and how the checker enforces that.

The chapter ends with a summary, and two homework exercises.
