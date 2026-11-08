# DataBank IMX - TypeScript Developer Training

A self-teaching repository for developers learning TypeScript, with a local lesson runner. It focuses on what TypeScript adds to JavaScript: types, the checker, and the habits that go with them. The aim is to understand the code well enough to change it, rather than to accept a checker message without knowing what it means.

## Read this first: this is an abbreviated course

This course is shorter than a full introduction to programming. It assumes you know the basics of JavaScript, and many of its lessons are deliberately brief. Each one teaches a single idea, and points at the source of the fuller explanation.

If you're new to programming, or you'd like the complete introduction this course builds on, start with the JavaScript training course:

**[databankimx/training-javascript](https://github.com/databankimx/training-javascript)**

That course covers the language from the beginning, with more practice and more worked examples. Its runner works the same way, so the way of working will feel familiar. Once you've finished it, come back here.

---

## License and Support

This repository is provided under the [MIT License](LICENSE). You are free to use, copy, modify, merge, publish, distribute, sublicense, and/or sell the materials in this repository, subject to the terms of that license.

This repository is provided for training and reference purposes only. DataBank IMX does not provide warranties, guarantees, maintenance, troubleshooting, implementation assistance, or technical support for this code or its use. Use it in any way permitted by the MIT License, but you are responsible for evaluating, adapting, testing, and supporting any use of it in your own environment.

---

## DataBank Responsibilities for Custom Code

All DataBank employees, including those working with AI-assisted tools, are bound by the [Development Rules of Engagement](development-rules-of-engagement.md). That document defines the rules for quoting, approving, developing, reviewing, scanning, storing, and delivering custom code for client work.

Key obligations that apply to everyone on every custom code engagement:

- **You own the code you deliver.** This applies equally to hand-written code, AI-assisted code, and AI-generated code.
- **Code must be reviewed before delivery.** Review must confirm that the code works, meets DataBank standards, and is maintainable, and that the developer understands it well enough to explain, debug, and maintain it.
- **Code must be in source control before delivery.** All custom code must be committed to the appropriate DataBank GitHub Enterprise repository before it is delivered to a client.
- **CI scanning must pass before delivery.** Required checks are the standards policy scan, SonarQube, and Snyk.
- **All third-party dependencies must be license-vetted.** The license must permit closed-source commercial use. Copyleft or unclear licensing must be escalated before use.
- **Only approved AI tools may be used.** Use only IT-approved tools through company accounts.
- **Custom code is billable work.** Code must be tied to an approved quote or engagement before commitment or delivery.

See the [Development Rules of Engagement](development-rules-of-engagement.md) for the full policy.

---

## Textbook and references

The course follows the JavaScript training course, chapter for chapter wherever the topic is the same, and adds the TypeScript material it needs. [CURRICULUM.md](CURRICULUM.md) maps each chapter.

- [training-javascript](https://github.com/databankimx/training-javascript)  -  the complete introduction to programming, which this course builds on.
- [The TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)  -  the official reference for the language. Lessons link to the matching sections where they go further.
- [MDN JavaScript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)  -  language explanations.
- [Node.js 24 documentation](https://nodejs.org/docs/latest-v24.x/api/)  -  Node APIs, including how Node runs `.ts` files directly.

Lessons quote only the short examples they need from these references, and explain the rest in their own words.

---

## Setup and requirements

- **Windows 10 or 11**
- **Node.js 24 or later.** The course relies on Node running `.ts` files directly.
- **VS Code** (recommended). TypeScript support is built in, and the editor reads the same `tsconfig.json` as the checker.

See [QUICKSTART.md](QUICKSTART.md) for a step-by-step guide.

### Quick start

From the repository root, in an Administrator PowerShell:

```pwsh
powershell -ExecutionPolicy Bypass -File .\setup.ps1
```

The script checks for Git, Node.js, and VS Code, installs anything missing, and installs the course's dependencies. It's safe to run more than once.

Then start the lesson runner:

```pwsh
npm start
```

---

## Learning workflow

1. Select a chapter, then select a step from the Steps pane. Read the lesson, and predict the output before you run anything.
2. Press **Run** to see what the program does. Press **Check** to see what the checker says about it, without running it.
3. Change the code and explain why the result changes. Compare the checker's message with what Node does, because they often disagree.
4. Solve homework in your own file first. Then press **Show solution** to compare your answer with the complete solution, which is read-only.
5. Move on when you can explain the behaviour, not when the program runs.

---

## Curriculum

The course has four parts. The chapters follow the JavaScript course's order, and each chapter has an introduction, runnable steps, a summary with quizzes, and homework.

| Part | Chapters | Status |
|---|---|---|
| I - Foundations | Getting started, types as promises, text, numbers, booleans and missing values, choices, loops, objects, arrays and collections, functions | In progress. Chapters 1 to 5 are written |
| II - Modelling | Aliases and interfaces, unions and narrowing, unknown and any, classes, generics, modules, error handling, async, HTTP and data | Planned |
| III - Working with HTML | Typing the DOM, forms, dynamic forms, security, tooling and configuration | Planned |
| IV - Advanced | Recursion, regular expressions, complexity, bitwise operations, closures, formatting, typed arrays, iterators, functional tools, advanced types, testing types, the final project | Planned |

The outline is a plan, and it may change as the lessons are written. [CURRICULUM.md](CURRICULUM.md) has the full mapping.

---

## Verification

```pwsh
npm test
npm run check
```

`npm test` renders every lesson, so a broken quiz or a missing file fails there, and it runs the runner's own tests. `npm run check` compiles every `solution.ts` with the same settings the editor uses, so the course's solutions stay correct as the course changes.

---

## Progress and reset

Your progress is kept in a file outside the repository, so it's never committed. The file holds the last lesson you were on, your quiz answers, and any solutions you've revealed. It's stored in your user data folder, in `training-typescript\progress.json`.

To clear all progress, press Ctrl+Alt+Shift+Backspace in the runner. A short message confirms the reset. Quiz answers are cleared, revealed solutions are hidden again, and the next start opens the first chapter.

---

## Runner design and limits

The lesson runner is a desktop window, built with Electron. Its page is written in TypeScript and plain HTML, and it runs with the sandbox and context isolation turned on. The page can't reach Node or the file system directly. It can only call a small, fixed set of functions that the main process provides.

Student code runs under the system Node, the same one VS Code uses, so Run gives the same results in both places. Each run gets a short time limit of 10 seconds, and a Stop button and the Escape key end it early. Run and Check work on a copy of the step in `.runner-work`, which is removed when the runner closes. The lesson files are never changed.

Running a program uses your account, and it is **not an operating-system sandbox**. Run trusted lesson code. The runner is intended for one local learner, not network hosting or multi-user deployment.

Markdown in lessons supports headings, paragraphs, lists, code blocks, and links. Raw HTML is shown as text, not run. Links to web addresses open in your default browser. Quizzes are answered with radio buttons, and each answer is saved with your progress.

---

## Third Party Licenses

The runner's dependencies were each reviewed under section 12 of the Development Rules of Engagement before use:

- **Electron** (MIT). It bundles Chromium, which is BSD-style, and FFmpeg, which is LGPL-2.1 or later. The FFmpeg obligations were escalated and approved. The Electron license and Chromium's license notices ship with the runner.
- **TypeScript** (Apache 2.0). It provides the checker and the compiler API.
- **CodeMirror 6** (MIT). Used for the editor.
- **markdown-it** (MIT). Renders lesson Markdown, with raw HTML off.
- **@lezer/highlight** and **@lezer/javascript** (MIT). Colour code blocks in lessons.

The exact versions are pinned in `package.json`, and the review record is kept in `LICENSE-REVIEW.md`.

For questions about licensing compliance, see the [Development Rules of Engagement](development-rules-of-engagement.md), section 12.

---

## Repository structure

```
training-typescript/
|- part-i-foundations/                   - Part I: each chapter is a folder inside the part
|  |- ch01-getting-started/              - Chapter 1: setup, the first programs, and the summary
|  |- ch02-types-as-promises/            - Chapter 2: annotations, inference, and homework
|  |- ch03-text/                         - Chapter 3: text, with its homework
|  |- ch04-numbers/                      - Chapter 4: numbers, with its homework
|  |- ch05-booleans-and-missing-values/  - Chapter 5: booleans, comparisons, and missing values
|- lesson-runner/                        - The desktop runner
|  |- src/                               - Main process, preload, and core modules
|  |- src/renderer/                      - The window: its page and its script
|  |- tests/                             - The runner's tests
|- scripts/                              - Build helpers
|- setup.ps1                             - Prepares everything the course needs
|- QUICKSTART.md                         - Step-by-step setup guide
|- CURRICULUM.md                         - How the chapters map to the JavaScript course
```

Each step is a folder with a `lesson.json`, a `lesson.md`, and, for runnable steps, a `main.ts` and a `solution.ts`. Homework is a `homework` step inside its chapter, and each exercise is a folder inside it.

---

## Authorship note

This training curriculum was developed for internal use at DataBank. As with the other training repositories, I used generative AI in places for code review, cleanup, and turning rough notes into readable documentation.

~ Scott McLean, 2026

---

## Version history

| Date | Changes |
|---|---|
| 11/08/2026 | Initial version: the lesson runner, setup and QUICKSTART, Part I chapters 1 to 5 with their summaries and homework, and the curriculum crosswalk |

---

## Contact

- [Scott McLean](mailto:smclean@databankimx.com)
- [Dev Team](mailto:development@databankimx.com)
