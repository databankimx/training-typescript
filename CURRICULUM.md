# Curriculum crosswalk

This course follows the JavaScript training course (https://github.com/databankimx/training-javascript), chapter for chapter where the topic is the same, and adds the TypeScript topics it needs. Every JavaScript topic has a home here, so nothing from the JavaScript course is left out. Where a TypeScript chapter covers more than one JavaScript chapter, the mapping says so.

The JavaScript course is the reference for the order of topics. The TypeScript course adds types to each one, and adds the TypeScript-only chapters. The JavaScript chapter numbers below are the course's own numbers, which run continuously across its parts.

## Part I - Foundations

| TS chapter | Topic | JavaScript chapter |
|---|---|---|
| 01 Getting started | Running, checking, printing, comments, reading errors | JS ch01 Hello (runtime, variables) |
| 02 Types as promises | Annotations, inference, what a type promises | JS ch02 Fundamentals (types, values, bindings) |
| 03 Text | Strings, template literals, string methods, searching, escapes | JS ch02 Fundamentals (strings, template literals, escapes) |
| 04 Numbers | Number types, arithmetic operators, rounding, formatting, floating-point, bases, parsing, Math | JS ch02 Fundamentals (arithmetic operators), JS ch03 Numbers |
| 05 Booleans and missing values | Comparisons, strict equality, truthiness, logical operators, null and undefined | JS ch05 Boolean logic |
| 06 Choices | `if`, `else`, the conditional operator, `switch`, complex conditions | JS ch06 Control flow |
| 07 Loops | `while`, `do...while`, `for`, `for...of`, `for...in`, `break` and `continue`, nested loops | JS ch07 Loops |
| 08 Objects | Object types, properties, name and value pairs | JS ch02 Fundamentals (objects) |
| 09 Arrays and collections | Array types, methods, nested arrays, traversal, pipelines, tuples and destructuring, maps and sets, searching, slices, splicing | JS ch04 Collections |
| 10 Functions | Parameters, return types, optional and default parameters, arrow functions, callbacks, scope | JS ch08 Functions (moved forward, because types need them early) |

## Part II - Modeling

| TS chapter | Topic | JavaScript chapter |
|---|---|---|
| 11 Aliases and interfaces | `type` and `interface`, and when to use each | TypeScript only |
| 12 Unions and narrowing | Unions, checking which kind of value you have | TypeScript only (builds on TS 05 and 06) |
| 13 Unknown and any | `unknown`, `any`, and why `any` weakens the promises | TypeScript only |
| 14 Classes | Class syntax, access modifiers, `readonly`, `implements` | JS ch09 Classes |
| 15 Generics | Type parameters, constraints, and the utility types built on them, such as `Readonly`, `Partial`, and `Pick` | TypeScript only |
| 16 Modules | Exports and imports, `import type`, module boundaries | JS ch10 Modules |
| 17 Error handling | `try`, `catch`, `finally`, throwing validation errors, typed failures | JS ch11 Error handling |
| 18 Async | Promises, `async` and `await`, rejections, `Promise.all` | JS ch12 Async |
| 19 HTTP and data | Requests and responses, `fetch`, JSON, checking data from outside the program | JS ch13 HTTP |

## Part III - Working with HTML

| TS chapter | Topic | JavaScript chapter |
|---|---|---|
| 20 Typing the DOM | Selecting elements, typed events, safe text | JS ch14 Browser (selection, events, timing, dynamic elements) |
| 21 Forms | Reading and writing form values, validation, formatting, conditional fields | JS ch15 Forms |
| 22 Dynamic forms | Rows added and changed at runtime, sorting and filtering | JS ch18 Dynamic forms |
| 23 Security | XSS, unsafe and safe text, testing for XSS | JS ch16 XSS |
| 24 Anti-bot strategies | Honeypot fields, timing checks, challenges, and the limits of client-side checks | JS ch17 Anti-bot strategies |
| 25 Tooling and configuration | `tsconfig`, strictness flags, declaration files | TypeScript only |

## Part IV - Advanced

| TS chapter | Topic | JavaScript chapter |
|---|---|---|
| 26 Recursion | Base cases, recursive functions, nested data | JS ch19 Recursion |
| 27 Regular expressions | Patterns, matching, and typing matches | JS ch20 Regular expressions |
| 28 Complexity | Big O, searching, sorting | JS ch21 Complexity |
| 29 Bitwise operations | Bits, shifts, masks, flags | JS ch22 Bitwise operations |
| 30 Closures | Captured state, private state, memoization | JS ch23 Closures |
| 31 Internationalized formatting | Numbers, dates, lists, relative time | JS ch24 Internationalized formatting |
| 32 Typed arrays | Binary data, buffers, text and bytes | JS ch25 Typed arrays |
| 33 Iterators and generators | Iterables, generators, async iteration | JS ch26 Iterators and generators |
| 34 Functional tools | Composition, partial application, pipelines | JS ch27 Functional tools |
| 35 Advanced types | Conditional types, mapped types, template literal types | TypeScript only |
| 36 Testing types and library design | Type tests, public APIs | TypeScript only |
| 37 Final project | Applying the course in one program | Capstone (JS ch36) |

## Notes

- Each chapter has an introduction, runnable steps, a summary, and homework, as in the JavaScript course.
- The JavaScript course's own homework (numbered `NN-homework` steps with exercises inside) maps to our homework folders. The exercises are written for TypeScript, so each one has a type to write.
- Part V of the JavaScript course is jQuery, which this course doesn't cover. jQuery has its own course.
- The TypeScript chapter numbers are a plan. The JavaScript course is the reference for order, so if its order changes, this table changes with it.
- Chapter 24 was added in the HTML part, after Security. Chapters 25 to 37 moved up by one to make room, and the JavaScript chapters from 17 onward moved up by one for the same reason.
