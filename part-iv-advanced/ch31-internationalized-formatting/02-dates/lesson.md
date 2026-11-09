# Formatting dates

A `Date` stores a single instant, but people read it as a day, which depends on the time zone. Midnight UTC on 9 November is still 8 November in parts of the United States, so a date printed without a fixed zone can show the wrong day. `Intl.DateTimeFormat` lets you fix both the locale and the zone.

> **Coming from JavaScript:** dates and `Intl.DateTimeFormat` are the same in both languages. The `Date` and `Intl.DateTimeFormat` labels are the TypeScript part.

## The program

```typescript
const moment: Date = new Date(Date.UTC(2026, 10, 9));

const longDate: Intl.DateTimeFormat = new Intl.DateTimeFormat("en-US", {
  timeZone: "UTC",
  year: "numeric",
  month: "long",
  day: "numeric",
});

console.log(longDate.format(moment));
```

```text
November 9, 2026
```

`Date.UTC` builds the instant from its parts, with months counted from zero, so November is `10`. The `timeZone: "UTC"` option makes the formatter read that instant in UTC, which is why the day printed is always the 9th.

## Why not leave the zone out

Without `timeZone`, the formatter uses the machine's zone. A visitor in a zone behind UTC would see 8 November, and the page would look wrong for them. Naming the zone makes the output the same everywhere, and it is the choice to make deliberately.

## Try it yourself

- Change the day to `Date.UTC(2026, 10, 9, 23, 30)`. Does the printed day change, and why?
- Remove `timeZone: "UTC"`, and run the program on a computer in another zone. What changes?

## Quiz

```quiz
Why is `timeZone: "UTC"` needed for a date that must read the same everywhere?
○ Because dates cannot be formatted without it.
→ Not quite. Dates can be formatted without it, but the day may then depend on the machine.
◉ Because without it the formatter uses the machine's zone, which can move the date to another day.
→ Right. Fixing the zone makes the printed day the same for every reader.
○ Because `UTC` makes the date longer.
→ Not quite. The zone decides which day is printed, not the length of the text.
```
