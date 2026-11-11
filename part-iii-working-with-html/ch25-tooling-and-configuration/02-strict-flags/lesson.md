# The strict flags

`strict` is a single setting that switches on a group of stricter checks. The group includes `noImplicitAny`, which refuses a parameter with no type, and `strictNullChecks`, which makes `null` and `undefined` part of every type that might hold them. Each check is on or off, and `strict` turns them all on at once. A project can switch on any one of them separately, but the course uses the whole group.

> **Coming from JavaScript:** these flags have no JavaScript meaning. JavaScript runs the same code either way, so the flags only change what the checker reports.

## The program

The program uses a typed function, a typed list, and a total built with a loop:

```ts
function greet(name: string): string {
  return `Hello, ${name}`;
}

const values: number[] = [1, 2, 3];
let total: number = 0;
for (const value of values) {
  total = total + value;
}

console.log(greet("Ada"), total);
```

Press **Run**. You should see `Hello, Ada 6`.

Every value has a type that the checker can read. That's what strict mode asks for. Without it, the checker would accept a value it cannot identify, and the mistake would show up later, when the program runs.

## What the checker refuses

Remove the `: string` from the parameter of `greet`, so the line reads `function greet(name) {`, and press **Check**. The checker reports that `name` has an implicit `any` type. Strict mode refuses a parameter whose type it has to guess, so the author must write the type down.

The same program also shows `noImplicitAny` working in reverse: the typed variables let the checker follow `total` through the loop, and it knows that `total` is a number at every step.

## Try it

- Remove `: string` from the parameter of `greet`, and press **Check**. Which line is reported, and what does the message say?
- Remove `: number` from `values`, and press **Check**. Does the checker still know the type of each `value`?
- Add `console.log(values.find((item: number) => item > 5));`, and press **Check**. What type does `find` return, and why must it be checked before use?

## Quiz

```quiz
What does `strict` do in `tsconfig.json`?
○ It makes the program run faster.
→ Not quite. `strict` changes what the checker reports, not how the program runs.
◉ It switches on a group of stricter checks, such as `noImplicitAny` and `strictNullChecks`.
→ Right. One setting turns on the whole group, which the course uses.
○ It stops the checker reading any files.
→ Not quite. The checker still reads the files named in `include`.
```

```quiz
Why does `noImplicitAny` report a parameter with no type?
○ Because parameters must always be numbers.
→ Not quite. A parameter can be any type, as long as the author states it.
◉ Because the checker would have to guess the type, and strict mode requires the author to write it.
→ Right. A type the checker can read is what makes its later reports reliable.
○ Because the parameter is unused.
→ Not quite. Unused parameters are not what this check is about.
```
