# Homework: sales status

A ticketing page shows one message for each state a show can be in: tickets are on sale, or the show has sold out. A status outside those two states is a bug, so the type should refuse it. The exercise uses a literal union for the status, and a `switch` that handles both values.

> **Coming from JavaScript:** `switch` and `return` work the same way in both languages. The `type` line and the literal union are the TypeScript part.

## The task

Here is the starting code, which prints a status as text:

```ts
const status: string = "open";

console.log(status);
```

Start from the code above, in your own file. Create a type `TicketStatus` that allows exactly `"open"` and `"soldOut"`. Write a function `ticketMessage` that takes a `TicketStatus` and returns `"Sell tickets"` for `"open"`, and `"Sold out"` for `"soldOut"`. Print `ticketMessage("open")`. The output should be:

```
Sell tickets
```

## Hints

- Write the union with the `|` symbol between the two exact values.
- Give each value its own `case` in the `switch`, and return from each case.

## When you're stuck

Show the solution. It's a spoiler, so give it a proper attempt in your own file first.

## Quiz

```quiz
What happens if someone calls `ticketMessage("closed")`?
○ It prints `Sold out`.
→ Not quite. `"closed"` isn't a value of `TicketStatus`, so the checker refuses the call.
◉ The checker reports the call, because `"closed"` isn't one of the allowed values.
→ Right. The literal union refuses any value it doesn't list, before the program runs.
○ It prints nothing, and the program carries on.
→ Not quite. The checker stops the call before the program runs, so it doesn't reach the function.
```
