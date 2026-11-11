# The review report

A reviewer needs one page that answers three questions: what invoice is this, how is it distributed, and can it be submitted? This step builds that page from the pieces already written. Every line reads the same lookups and the same reconciliation, so the report cannot disagree with the checks.

> **Coming from JavaScript:** the report is ordinary code in both languages. The `Invoice`, `DistributionRow`, and `LookupResult` types are the TypeScript part, and they keep each piece's fields consistent across the steps.

## The program

```typescript
function buildReport(invoice: Invoice, rows: DistributionRow[], notes: string[]): string[] {
  const lines: string[] = [];
  lines.push(`Invoice ${invoice.number}`);
  lines.push(`Invoice total: ${formatCents(invoice.amountCents)}`);

  for (const row of rows) {
    const lookup: LookupResult = lookupGlCode(row.code);
    const label: string = lookup.ok ? lookup.description : "unknown code";
    lines.push(`  ${row.code}  ${label}  ${formatCents(row.amountCents)}`);
  }

  if (notes.length === 0) {
    lines.push("Notes: none");
  } else {
    for (const note of notes) {
      lines.push(`Note: ${note}`);
    }
  }

  const errors: string[] = reconcile(invoice, rows);
  lines.push(errors.length === 0 ? "Status: ready to submit" : `Status: needs correction (${errors.length} problem(s))`);
  return lines;
}

for (const line of buildReport(invoice, rows, [])) {
  console.log(line);
}
```

```text
Invoice INV-1001
Invoice total: $100.00
  6100  Office supplies  $50.00
  6200  Professional services  $40.00
Notes: none
Status: ready to submit
```

The report is built as a list of lines, so each part can be added or changed without touching the others. Each row's label comes from the same lookup used by the checker, and the status comes from the same reconciliation, so the report agrees with the checks by construction.

## Notes are data

A note is text typed by a person, so the report adds it as plain text and never interprets it. If a note contained markup-like characters, they would print as characters. Keeping user text as data, and never building markup from it, is what stops it from changing the page or the report's structure.

## Try it yourself

- Change the second row's amount to `3900`. What does the status line say now, and why does the report not name the problem?
- Pass one note, such as `"Paid by card on file"`, in place of `[]`. Where does it appear?

## Quiz

```quiz
Why does the report use the same `reconcile` function as the checker, rather than its own status test?
○ Because a second test would be slower to write.
→ Not quite. The reason is that the two must always agree.
◉ So the status the report shows can never disagree with the reconciliation the checker applies.
→ Right. Sharing the function makes the two outcomes identical by construction.
○ Because `reconcile` is the only function the checker can call.
→ Not quite. It is shared because it is the single source of the rule.
```
