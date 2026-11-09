# Remembered variables

When a function is written inside another function, it can read the outer function's variables. When the outer function returns the inner one, those variables are kept alive for as long as the returned function exists. The inner function is a closure over the outer function's scope.

> **Coming from JavaScript:** closures are the same in both languages. The return type `(name: string) => string` is the TypeScript part, and it tells the caller exactly what the returned function accepts and gives back.

## The program

```typescript
function makeGreeter(greeting: string): (name: string) => string {
  return (name: string): string => `${greeting}, ${name}!`;
}

const hello = makeGreeter("Hello");
const hi = makeGreeter("Hi");

console.log(hello("Ada"));
console.log(hi("Grace"));
```

```text
Hello, Ada!
Hi, Grace!
```

`makeGreeter` has finished by the time `hello` is called, yet `hello` still uses `greeting`, which was `"Hello"`. Each call to `makeGreeter` creates a new closure with its own `greeting`, so `hello` and `hi` do not interfere with each other.

## Why this is useful

A function can be configured once and then used many times, with the configuration kept inside. This is the same pattern a callback uses when it needs to remember something from the place where it was defined.

## Try it yourself

- Add `const goodbye = makeGreeter("Goodbye");`, and call it with your own name.
- Call `makeGreeter("Hello")` twice, and compare the two results with `===`. Are they the same function, and why?

## Quiz

```quiz
Why does `hello("Ada")` still know the greeting after `makeGreeter` has returned?
○ Because the greeting is stored in a file.
→ Not quite. The greeting is kept in memory by the closure.
◉ Because the returned function keeps the variables from the scope where it was written.
→ Right. The closure holds on to the greeting for as long as the function exists.
○ Because functions always remember the last value passed to them.
→ Not quite. Only the variables in scope at creation are remembered.
```
