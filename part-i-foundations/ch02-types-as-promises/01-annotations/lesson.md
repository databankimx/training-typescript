# Annotations: writing the promise down

A function is a little machine with a slot for its input and a chute for its output. An annotation is the label on each slot and chute, saying what goes in and what comes out. Labels cost nothing, and they save an astonishing amount of confusion.

> **Coming from JavaScript:** the annotations are the TypeScript part. The function itself is plain JavaScript, and Node runs it without the labels.

## What is a function?

A **function** is a named set of instructions you can use again and again. You call it by name and give it an input. It gives back a result.

Here's a function that greets someone by name:

```ts
function greet(name: string): string {
  return `Hello, ${name}!`;
}

console.log(greet("Ada"));
```

Press **Run**. You should see `Hello, Ada!`.

## The parts of the function

- **`greet`** is the name of the function.
- **`name`** is the **parameter**. It's a box that holds the input, the name of the person to greet.
- **`: string`** after `name` is an **annotation**. It's a label that says what kind of value the box should hold: text.
- **`: string`** after the brackets is the return annotation. It says the function gives back text.
- **`return`** sends the result back to whoever called the function.

The annotations don't change what the program does. They write the promise down, so the checker can check it, and so the next reader knows what the function expects.

## Breaking the promise

Change the last line of `main.ts` so it passes a number:

```ts
console.log(greet(42));
```

Press **Check**. The checker reports that a `number` can't be used where `string` is expected. It points at the `42`, so you can see the broken promise.

Now press **Run**. Node prints `Hello, 42!` without complaint, because Node doesn't check promises. A program can run and still break its promise.

Put `"Ada"` back, and press **Check**. It should pass.

## Try it

- Change `return` so the function gives back a number, such as `return name.length;`. Press **Check**. The checker reports the return annotation, because the function now breaks its promise.
- Remove `: string` from `name`, and press **Check**. The checker says the parameter has no type. Put the annotation back.

## Quiz

```quiz
In `function greet(name: string): string`, what does the `: string` after the brackets promise?
○ The function receives text when it's called.
→ That's the promise on `name`. The label after the brackets is about the result.
◉ The function gives back text.
→ Right. The return annotation promises the kind of value the caller gets back.
○ The program prints text.
→ Not quite. Annotations describe values. They don't decide what gets printed.
```

```quiz
Why does Node run `greet(42)` without any complaint, when the checker reports it?
○ Node checks the types, and allows the number because it can be printed.
→ Not quite. Node doesn't check types at all.
◉ Node doesn't enforce annotations, so only the checker reports the broken promise.
→ Right. The checker compares arguments with annotations. Node runs whatever it's given.
○ The checker is wrong, and Node is right.
→ Not quite. The checker is correct. Node simply doesn't check the promise.
```
