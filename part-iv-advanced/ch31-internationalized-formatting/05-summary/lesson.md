## Summary: Internationalized formatting

The `Intl` object formats values the way a locale expects, so the program does not carry its own rules.

* **Name the locale.** The output depends on it, and leaving it to the machine makes results differ between readers.
* **Name the time zone for dates.** Otherwise the printed day can change with the reader's location.
* **Ask for plural categories.** `Intl.PluralRules` gives the category for a count in that language.
* **Create formatters once.** A formatter is an object, and reusing one avoids repeating its setup.

### Check your understanding

*These questions are written for this course.*

```quiz
A program prints `$1,234.50` on one computer and `1.234,50 $` on another. What is the most likely cause?
○ The number is stored differently.
→ Not quite. The stored number is the same, so the difference is in the formatting.
◉ The locale was not named, so each machine used its own default.
→ Right. Naming the locale makes the output the same everywhere.
○ The currency is calculated differently.
→ Not quite. The amount is the same, so the difference is the layout.
```

```quiz
Why should a date be formatted with an explicit time zone?
○ Because dates are stored without a time zone.
→ Not quite. A date is stored as an instant, and the zone decides the day shown.
◉ Because the zone decides which calendar day an instant falls on, and that varies between places.
→ Right. Fixing the zone keeps the day the same for every reader.
○ Because `Intl` refuses dates without one.
→ Not quite. It accepts them, but the output then depends on the machine.
```

```quiz
Why does a program ask `Intl.PluralRules` for a category instead of testing `count === 1`?
○ Because `===` cannot compare numbers.
→ Not quite. It can compare numbers.
◉ Because other languages have different plural rules, and the locale knows them.
→ Right. The category keeps the program correct in any locale.
○ Because `select` is required for every count.
→ Not quite. It is a choice, and the simpler test is correct only for one language.
```
