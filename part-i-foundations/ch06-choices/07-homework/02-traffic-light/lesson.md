# Homework: traffic light

A traffic light shows one of three colors, and each color means one instruction for the driver. Almost every time the light is red, amber, or green. The exercise is about the case nobody expected, because that's where a program earns its keep.

> **Coming from JavaScript:** `switch` works the same way in both languages. The `: string` label is the TypeScript part.

## The task

Here is the starting code, which prints the light's color:

```ts
const light: string = "amber";

console.log(light);
```

Start from the code above, in your own file, and change it so that it prints an instruction for the color:

- `red` prints `Stop`
- `amber` prints `Get ready`
- `green` prints `Go`
- anything else prints `Unknown light`

With the color above, the answer should be `Get ready`.

## Hints

- Use a `case` for each color, and a `break` at the end of each one.
- The `default` case handles any color you didn't list, so an unexpected value is never silent.

## When you're stuck

Show the solution. It's a spoiler, so give it a proper attempt in your own file first.

## Quiz

```quiz
What would happen if the `default` case were removed, and the light were `"blue"`?
○ The program would print `Unknown light`.
→ Not quite. Without `default`, no case matches `"blue"`, so nothing is printed.
◉ Nothing would print, and the mistake would go unnoticed.
→ Right. A value with no matching case is silently skipped unless you handle it.
○ The checker would refuse to run the program.
→ Not quite. The checker doesn't check the color's name, so the program still runs.
```
