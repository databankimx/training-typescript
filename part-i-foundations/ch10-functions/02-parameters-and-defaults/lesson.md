# Parameters and defaults

A function often needs an input that has a sensible value most of the time. A greeting is usually "Hello", but sometimes it should be "Welcome". You can give a parameter a default, so callers can leave it out, or make a parameter optional so the function works with or without it.

> **Coming from JavaScript:** default parameters and optional parameters are the same in both languages. The `?` on an optional parameter and the `: string` labels are the TypeScript part.

## The program

The program is already in `main.ts`:

```ts
function greet(name: string, greeting: string = "Hello"): string {
  return `${greeting}, ${name}!`;
}

function shout(message: string, times?: number): string {
  return message.toUpperCase().repeat(times ?? 1);
}

console.log(greet("Ada"));
console.log(greet("Grace", "Welcome"));
console.log(shout("hi", 2));
console.log(shout("hi"));
```

Press **Run**. You should see:

```
Hello, Ada!
Welcome, Grace!
HIHI
HI
```

There are two different ways to make a parameter optional:

- **`greeting: string = "Hello"`** is a **default**. If the caller leaves it out, the parameter takes the value `"Hello"`. The first call to `greet` relies on this, so `Hello, Ada!` is printed.
- **`times?: number`** is an **optional** parameter. The `?` means the caller may leave it out, and then the parameter has no value, which is `undefined`.

The function `shout` deals with the missing value using `??`, from the missing-values chapter. When `times` is missing, `times ?? 1` gives `1`, so the message is repeated once.

## Required parameters come first

A parameter with a default or a `?` must come after the parameters that the caller always has to supply. `greet(name, greeting = "Hello")` works, because `name` is always given. The checker rejects an order that leaves a required parameter after an optional one, because the caller couldn't tell which value was meant.

## Try it

- Call `greet("Linus")`, and add the line to the program. What's printed?
- Call `shout("go", 3)`. What do you get?
- Change `times?: number` to `times: number`, and press **Check**. Then remove `times` from the call `shout("hi")`. What does the checker report?

## Quiz

```quiz
What does `greet("Ada")` print, using the function above?
○ `Welcome, Ada!`
→ Not quite. The caller didn't supply a greeting, so the default is used.
◉ `Hello, Ada!`
→ Right. The missing parameter takes its default value, `"Hello"`.
○ `undefined, Ada!`
→ Not quite. A default gives a value, so `undefined` isn't printed.
```

```quiz
What value does an optional parameter have when the caller leaves it out?
○ `0`
→ Not quite. An optional parameter has no value when it's left out, not zero.
◉ `undefined`
→ Right. That's why the function uses `??` to give it a fallback.
○ `""`
→ Not quite. A missing optional parameter is `undefined`, not empty text.
```
