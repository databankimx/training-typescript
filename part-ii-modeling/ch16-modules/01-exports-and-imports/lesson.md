# Exports and imports

A module is a file. Anything it marks with `export` can be used by other files, and anything it doesn't mark stays private to it. Another file brings the exported names in with an `import` line at the top, and then uses them as if they had been written there.

> **Coming from JavaScript:** `export` and `import` are the same in both languages, and Node runs them directly. The types on the exported functions are the TypeScript part.

## The files

This step has two files. `greetings.ts` is the module, and it exports a function and a value:

```ts
export function greet(name: string): string {
  return `Hello, ${name}!`;
}

export const defaultName: string = "friend";
```

`main.ts` imports both names from that module, and uses them:

```ts
import { greet, defaultName } from "./greetings.ts";

console.log(greet("Ada"));
console.log(greet(defaultName));
```

Press **Run**. You should see:

```
Hello, Ada!
Hello, friend!
```

The file name in the import is `./greetings.ts`, with the dot and the slash, which means "in this folder". The extension is written in full, which is how modern Node and this course's settings expect a relative import to be written. The names in braces must match the exported names exactly, including their spelling and capitals.

## Where the runner finds the module

When you press **Run**, the runner copies every code file in the step into a work folder, so `greetings.ts` is available beside `main.ts`. A step can have as many modules as it needs. Each code file is listed in a **File** drop-down above the editor, so you can choose `greetings.ts` and edit it. Each file keeps its own edits while you work on another, and an asterisk marks a file you've changed. **Run** and **Check** use every file you've edited. The runner leaves out the lesson text, the lesson settings, and the solution, so the learner's code files are the only ones that run.

## Try it

- Add a new exported function `farewell(name: string): string` to `greetings.ts`, import it in `main.ts`, and print `farewell("Ada")`.
- Remove `export` from `defaultName`, and press **Check** on `main.ts`. What does the checker report?
- Change `import { greet, defaultName }` to `import { greet, defaultname }`, and press **Check**. What does it say?

## Quiz

```quiz
What does `export` do in `greetings.ts`?
○ It runs the function when the file is loaded.
→ Not quite. `export` makes a name available to other files. It doesn't run anything.
◉ It makes the name available for other files to import.
→ Right. An exported name is visible outside the module, and anything without `export` stays private.
○ It copies the function into `main.ts`.
→ Not quite. Importing shares the exported name, rather than copying the code into another file.
```

```quiz
Why does `import { greet, defaultName } from "./greetings.ts";` need the names in braces to match the exports exactly?
○ Because braces are used only for text.
→ Not quite. Braces are the way to name what's imported from a module.
◉ Because the import looks up each name by its exact spelling, so a different spelling finds nothing.
→ Right. Names are matched exactly, including capitals, so a misspelling is reported.
○ Because the checker sorts the names before it imports them.
→ Not quite. The checker matches the names, and doesn't reorder them.
```
