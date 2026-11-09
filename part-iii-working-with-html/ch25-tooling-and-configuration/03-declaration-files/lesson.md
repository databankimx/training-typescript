# Declaration files

A declaration file, with the ending `.d.ts`, holds only types. It says what a value looks like, and it contains no code. The checker reads it to know the types, and Node never loads it. That makes declaration files the way to describe code the checker cannot read, such as a JavaScript library, or a module written in plain JavaScript.

> **Coming from JavaScript:** JavaScript has no declaration files. They exist for the checker, and Node ignores them.

## The files

`report.d.ts` declares an interface. It has no code, only the shape:

```ts
export interface ReportLine {
  label: string;
  value: number;
}
```

`main.ts` imports that type, and uses it to label a value:

```ts
import type { ReportLine } from "./report.js";

const line: ReportLine = { label: "Items", value: 4 };

console.log(`${line.label}: ${line.value}`);
```

Press **Run**. You should see `Items: 4`.

The import says `./report.js`, which is the name the file has when it's loaded as JavaScript. The checker maps that name to `report.d.ts`, the declaration beside it. Because the import is `import type`, nothing is loaded at run time, so the program doesn't need a file called `report.js` at all.

## Where declarations help

A library written in JavaScript has no types of its own. A declaration file describes its functions and values, so the program can use them with the checker's help. The declarations only describe the library. Its code is still JavaScript, and the program must still be able to load it.

## Try it

- Change `value: 4` to `value: "four"`, and press **Check**. What does the checker report?
- Add `unit: string;` to `ReportLine` in `report.d.ts`, and press **Check**. Which line is reported, and why?
- Change `import type` to a plain `import`, and press **Check**. What does the checker say about an interface imported that way?

## Quiz

```quiz
What does a `.d.ts` file contain?
○ Code that runs when the program starts.
→ Not quite. A declaration file has types only, and no code runs from it.
◉ Types that describe code, which the checker reads and Node never loads.
→ Right. Declaration files describe shapes, and they are erased before the program runs.
○ Test cases for the program.
→ Not quite. Tests are separate, and a declaration file contains types only.
```

```quiz
Why does `import type` avoid a run-time error when `report.js` doesn't exist?
○ Because `import type` loads a copy of the file.
→ Not quite. `import type` loads nothing at run time.
◉ Because `import type` is erased, so Node never tries to load the module.
→ Right. A type-only import leaves no trace in the program that runs.
○ Because the checker creates `report.js` automatically.
→ Not quite. The checker doesn't create files. The import is erased before Node runs.
```
