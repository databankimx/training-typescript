# Plurals and lists

English has two forms for most nouns, one for one thing and another for everything else. Other languages have more, and some have none. `Intl.PluralRules` asks the locale which category a count falls into, so the program does not need to know the rule for each language. `Intl.ListFormat` joins items with the right conjunction, such as `and` or `or`.

> **Coming from JavaScript:** both objects are the same in both languages. The `Intl.PluralRules` and `Intl.ListFormat` labels are the TypeScript part.

## The program

```typescript
const rules: Intl.PluralRules = new Intl.PluralRules("en-US");

function countLabel(count: number): string {
  return `${count} ${rules.select(count) === "one" ? "item" : "items"}`;
}

console.log(countLabel(1));
console.log(countLabel(2));

const names: Intl.ListFormat = new Intl.ListFormat("en", { style: "long", type: "conjunction" });
console.log(names.format(["Ada", "Grace", "Linus"]));
```

```text
1 item
2 items
Ada, Grace, and Linus
```

`select` returns a category name, such as `"one"` or `"other"`, and the program chooses the word from it. Checking `count === 1` would work for English, but it would be wrong in a language with a different rule, and this version stays correct when the locale changes.

The list formatter adds the commas and the final `and` itself. Asking for `type: "disjunction"` would give `or` instead.

## Try it yourself

- Change `countLabel` to test `count === 1` instead of using the rules. Does `0 items` change?
- Format a two-name list. Does it still get a comma?

## Quiz

```quiz
Why does the program ask `rules.select(count)` rather than test `count === 1`?
○ Because `select` is faster.
→ Not quite. The reason is correctness across languages, not speed.
◉ Because the plural rule differs between languages, and the locale knows the rule for its language.
→ Right. Asking the locale keeps the program right when the language changes.
○ Because `count` cannot be compared with a number.
→ Not quite. It can be compared, but the comparison would encode English alone.
```
