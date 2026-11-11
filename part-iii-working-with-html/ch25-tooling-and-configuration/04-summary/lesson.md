## Summary: Tooling and configuration

Configuration changes what the checker reports, and the program's behaviour stays the same.

* **`tsconfig.json` names the files and the rules.** Its `include` list says which files are checked, and its `compilerOptions` set the checks.
* **`strict` turns on a group of checks.** `noImplicitAny` and `strictNullChecks` are two of them, and they make the author state types the checker would otherwise guess.
* **A `.d.ts` file describes types without code.** The checker reads it, and the import that uses it is erased before the program runs.
* **Settings are a team decision.** A change to `tsconfig.json` affects every file the checker reads.

### Check your understanding

*These questions are written for this course.*

```quiz
A team turns on `strict` in `tsconfig.json`. What changes?
○ Every program runs faster.
→ Not quite. `strict` changes what the checker reports, not how programs run.
◉ The checker reports more problems, such as missing types and unchecked `null` values.
→ Right. Strict mode adds checks, so more code is reported until it is made explicit.
○ Node starts reading the settings file.
→ Not quite. Node still ignores `tsconfig.json`.
```

```quiz
Why would a library written in JavaScript need a `.d.ts` file?
○ Because JavaScript libraries cannot be run by Node.
→ Not quite. They run, and the declaration file serves the checker.
◉ So the checker knows the library's types, without the library itself being rewritten in TypeScript.
→ Right. A declaration file describes the library so the program can use it safely.
○ Because the checker refuses any JavaScript file.
→ Not quite. The checker accepts JavaScript when it's configured to, and a declaration file is a separate way to describe it.
```

```quiz
What does `import type { ReportLine } from "./report.js";` do at run time?
○ Loads `report.js` into the program.
→ Not quite. A type-only import loads nothing.
◉ Nothing. The import is erased, so only the checker uses it.
→ Right. Type-only imports leave no code in the running program.
○ Creates the `ReportLine` value.
→ Not quite. `ReportLine` is a type, and types have no value at run time.
```
