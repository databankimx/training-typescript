# Reconciling a distribution

The heart of the checker is the reconciliation. An invoice of 100.00 with 8.00 of tax and 2.00 of freight leaves 90.00 for the GL distribution. The rows must add up to exactly that amount, and each row must use an active code with a positive amount.

The function does not stop at the first problem. It collects every error into a list, so the person correcting the distribution sees all of them at once.

> **Coming from JavaScript:** the logic is the same in both languages. The interfaces `Invoice` and `DistributionRow` are the TypeScript part, and they stop a row from being built with a missing field.

## The program

```typescript
function reconcile(invoice: Invoice, rows: DistributionRow[]): string[] {
  const errors: string[] = [];

  for (const row of rows) {
    if (!activeCodes.has(row.code)) {
      errors.push(`${row.code} is not an active GL code`);
    }
    if (row.amountCents <= 0) {
      errors.push(`${row.code} needs a positive amount`);
    }
  }

  const subtotal: number = rows.reduce((sum: number, row: DistributionRow): number => sum + row.amountCents, 0);
  const expected: number = expectedSubtotal(invoice);
  if (subtotal !== expected) {
    errors.push(`GL subtotal must equal ${formatCents(expected)} after tax and freight`);
  }

  return errors;
}
```

```text
Reconciled: yes
Not reconciled: GL subtotal must equal $90.00 after tax and freight
```

The first distribution sums to 9000 cents, which equals 10000 less 800 and 200, so it reconciles. The second sums to 8900 cents, 100 short, and the message gives the amount the subtotal must equal in dollars.

## Why integers make the check exact

The comparison `subtotal !== expected` is safe only because both sides are whole cents. With decimal amounts, two correct-looking totals could differ by a fraction of a cent and fail the check for no visible reason. Whole cents remove that risk.

## Try it yourself

- Change the second row to `{ code: "6900", amountCents: 3900 }`. How many errors are reported, and what are they?
- Set one row's amount to `0`. Does the subtotal message still appear?

## Quiz

```quiz
Why does `reconcile` collect errors into a list instead of returning at the first one?
○ Because the checker cannot report more than one error.
→ Not quite. The checker is not involved in this list.
◉ So the person correcting the distribution sees every problem in one pass, rather than fixing them one at a time.
→ Right. Reporting everything saves repeated rounds of correction.
○ Because an empty list is faster to return than a message.
→ Not quite. The reason is what the user sees, not speed.
```
