# Ch25 - Tooling and configuration

So far the checker has been a tool you press. This chapter is about the file that controls it. `tsconfig.json` decides which files are checked, which JavaScript features are allowed, and how strict the checker is. Changing one setting can turn a loose project into a strict one, and it can make a set of errors appear or disappear without touching any code.

The course's own settings are in `tsconfig.json` at the root of the repository, so the examples here use them. The lessons show what each setting does, and where the checker reports its effect.

## What you'll learn

1. What `tsconfig.json` controls, and which files the checker reads.
2. How the strict flags turn on checks that are off by default, and what each one catches.
3. How a declaration file (`.d.ts`) describes types for code the checker does not read.

The chapter ends with a summary, and two homework exercises.
