# Defining functions

A function is a named set of instructions. You give it a name, list its inputs, write what it does, and say what it gives back. Once it exists, you can call it from anywhere, as often as you like, with different inputs each time. You've been calling functions all along, so this step is about writing one.

> **Coming from JavaScript:** function declarations are the same in both languages. The labels on the inputs and the result are the TypeScript part, and Node ignores them when the program runs.

## The program

The program is already in `main.ts`:

```ts
function greet(name: string): string {
  return `Hello, ${name}!`;
}

console.log(greet("Ada"));
console.log(greet("Grace"));
```

Press **Run**. You should see:

```
Hello, Ada!
Hello, Grace!
```

Here are the parts of the function:

- **`function greet`** introduces the function, and `greet` is its name.
- **`(name: string)`** is the parameter list. `name` is an input, and the label says it's text.
- **`: string`** after the brackets says what the function gives back.
- **`return`** sends the result back to whoever called it.

The function is written once and called twice. Each call supplies a different name, so the output differs. The function's instructions don't change between calls.

## Parameters are local

The name `name` exists only inside `greet`. Outside the function, there's no `name` to read. Each call gets its own copy of the input, which keeps one function's working values from leaking into another.

## Try it

- Call `greet` with `"Linus"`, and add the line to the program. What's printed?
- Call `greet(42)`, and press **Check**. What does the checker say about the value?
- Write `console.log(name);` below the program, and press **Check**. What does the checker report?

## Quiz

```quiz
What does `return` do in a function?
○ It prints the value on the screen.
→ Not quite. `return` sends the value back to whoever called the function. It doesn't print anything.
◉ It sends the result back to the place where the function was called.
→ Right. The caller receives that value, and can store it or print it.
○ It starts the function again.
→ Not quite. `return` ends the function and sends back its result.
```

```quiz
Why can't the program read `name` outside the `greet` function?
○ Because `name` is a reserved word.
→ Not quite. `name` is a normal name, and you can use it elsewhere.
◉ Because the parameter exists only inside the function that declares it.
→ Right. A parameter is local to its function, so it isn't visible outside.
○ Because the checker deletes it after the call.
→ Not quite. The checker doesn't change the program. The name is simply out of scope.
```
