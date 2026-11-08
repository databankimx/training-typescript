# Switch

When a value can be one of several named things, a long `if` chain is hard to scan. `switch` lists the named cases in one place, and the program jumps to the one that matches. It suits days of the week, menu choices, and status codes, where each value has a name.

> **Coming from JavaScript:** `switch` works the same way in both languages. The checker does not require every case to end with `break`, so the rest of this step explains why you should.

## The program

The program is already in `main.ts`:

```ts
const day: string = "Sat";

switch (day) {
  case "Sat":
  case "Sun":
    console.log("weekend");
    break;
  case "Mon":
    console.log("start of the week");
    break;
  default:
    console.log("weekday");
}
```

Press **Run**. You should see `weekend`.

Here's how the program reads it:

- **`switch (day)`** is the value to compare.
- **`case "Sat":`** is a label. If `day` matches it, the program starts running at that label.
- **`break;`** leaves the switch. Without it, the program keeps running the cases below.
- **`default:`** runs when nothing else matched. It's the switch equivalent of `else`.

## Falling through

The cases `"Sat"` and `"Sun"` have no code of their own. Because they have no `break` between them, the program continues from `"Sat"` into `"Sun"`, and both share the same line. This is called falling through, and it's useful exactly when two values should behave the same.

The risk comes when you forget a `break` by accident. The next case runs as well, and the output is wrong in a way that's easy to miss. Put a `break` at the end of every case unless you mean to fall through, and say so in a comment when you do.

## Try it

- Change `day` to `"Mon"`, and run. Which line prints?
- Change `day` to `"Tue"`. Which branch runs?
- Remove the `break` after `console.log("weekend");`, and run. What's printed now, and why?

## Quiz

```quiz
What does the `default` case do?
○ It runs first, before the other cases.
→ Not quite. `default` is only used when nothing else matched.
◉ It runs when none of the cases matched.
→ Right. It's the fallback, like the final `else` in an `if` chain.
○ It runs every time, after the switch.
→ Not quite. It only runs when no other case matched.
```

```quiz
Why does `case "Sat":` have no `break` before `case "Sun":`?
○ Because `break` is only needed at the end of the whole switch.
→ Not quite. A `break` is needed at the end of each case that should stop there.
◉ Because both days should run the same code, so the cases share it.
→ Right. The program falls through from `"Sat"` into the code for `"Sun"`, which is what the shared code needs.
○ Because the checker removes `break` statements before the program runs.
→ Not quite. The checker doesn't change the program, and `break` is needed to stop the cases running on.
```
