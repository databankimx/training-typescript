# Nested choices

Some decisions depend on another decision. You can't check whether someone may enter until you know they have a ticket, and the age rule only matters after that. An `if` inside another `if` expresses that dependency directly. It's a perfectly good tool, and it's also easy to make hard to read.

> **Coming from JavaScript:** nested `if` statements are the same in both languages. The checker treats each condition the same way it does on its own.

## The program

The program is already in `main.ts`:

```ts
const hasTicket: boolean = true;
const age: number = 17;
const hasGuardian: boolean = true;

if (hasTicket) {
  if (age >= 18) {
    console.log("enter");
  } else if (hasGuardian) {
    console.log("enter with guardian");
  } else {
    console.log("not allowed");
  }
} else {
  console.log("buy a ticket");
}
```

Press **Run**. You should see `enter with guardian`.

The outer `if` checks the ticket first. Only if there's a ticket does the program look at the age, inside the inner `if`. Age `17` isn't at least `18`, so the inner `else if` checks for a guardian, and there is one.

Notice that the braces show which `else` belongs to which `if`. The indentation helps the reader too, but the braces are what the program reads.

## Flat is often clearer

The same rules can be written as a flat list of conditions, where each one is checked from the top:

```ts
if (!hasTicket) {
  console.log("buy a ticket");
} else if (age >= 18) {
  console.log("enter");
} else if (hasGuardian) {
  console.log("enter with guardian");
} else {
  console.log("not allowed");
}
```

Both versions give the same answers. The flat version is easier to follow when the rules are a sequence of checks, each with its own outcome. The nested version is clearer when one choice really does depend on the other, and the inner choices only make sense inside the outer one.

## Try it

- Change `hasTicket` to `false`, and run. Which line prints?
- Change `age` to `20`, and run. Which branch runs?
- Write the flat version above in your own copy of the file, and check that it prints the same thing as the nested version for each set of values.

## Quiz

```quiz
In the nested version, when does the program check `age >= 18`?
○ Always, before the ticket check.
→ Not quite. The inner check sits inside the outer one, so it only runs when there's a ticket.
◉ Only when `hasTicket` is `true`.
→ Right. The inner `if` belongs to the outer `if`, so it runs only inside its block.
○ Only when `hasGuardian` is `false`.
→ Not quite. The age check doesn't depend on the guardian. It depends on the ticket.
```

```quiz
When is a flat list of conditions usually clearer than nested choices?
○ When each choice depends on an earlier one.
→ Not quite. That's when nesting is the honest way to write it.
◉ When the rules are a sequence of checks, each with its own outcome.
→ Right. A flat list reads from top to bottom, one rule at a time.
○ When the program has only one condition.
→ Not quite. With one condition there's nothing to nest or flatten.
```
