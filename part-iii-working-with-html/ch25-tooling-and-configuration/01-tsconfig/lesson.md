# What tsconfig controls

`tsconfig.json` is the checker's instructions. Its `include` list names the files to check, its `compilerOptions` set how strict the checker is, and the `lib` option says which built-in types are available, such as the browser's DOM. Every option is a setting, and each one changes the reports without changing the code.

> **Coming from JavaScript:** JavaScript has no equivalent file. Node ignores `tsconfig.json`, so the program runs the same whatever the settings say. The settings only affect the checker.

## The program

The program describes a project's settings with an interface, and prints a summary of them:

```ts
interface ProjectSettings {
  name: string;
  strict: boolean;
  include: string[];
}

const settings: ProjectSettings = {
  name: "training",
  strict: true,
  include: ["ch*/**/*.ts"],
};

console.log(`${settings.name}: strict ${settings.strict ? "on" : "off"}, ${settings.include.length} pattern`);
```

Press **Run**. You should see `training: strict on, 1 pattern`.

The object describes settings in the same shape as a real `tsconfig.json`, where `include` is a list of file patterns. The program only prints them. The checker is what would act on them, and it reads the real file, not this object.

## Where the real settings live

The course's file is `tsconfig.json` at the repository root. Its `include` lists the folders the checker reads, and its `compilerOptions` hold the strictness flags. Changing it changes what Check reports for every step, so a change there is a decision for the whole course, not for one lesson.

## Try it

- Change `strict: true` to `strict: false`, and run. What does the output show, and does the checker change?
- Add a second pattern, `"lesson-runner/**/*.ts"`, to `include`, and run. What is printed?
- Change `strict: true` to `strict: "yes"`, and press **Check**. What does the checker report?

## Quiz

```quiz
Why does Node run this program the same way whatever `strict` is set to?
○ Because Node checks `strict` before running.
→ Not quite. Node doesn't read `strict`, and the checker is the only tool that does.
◉ Because the program only prints the settings, and Node ignores `tsconfig.json`.
→ Right. The settings are data here, and the checker is what acts on the real file.
○ Because `strict` is not a real setting.
→ Not quite. `strict` is a real checker option. Node simply never reads it.
```

```quiz
What does the `include` list in `tsconfig.json` decide?
○ Which packages the program can import.
→ Not quite. Packages are a separate matter, and `include` is about the checker's files.
◉ Which files the checker reads and reports on.
→ Right. The list of patterns tells the checker which code to check.
○ Which numbers the program prints.
→ Not quite. `include` has nothing to do with printing.
```
