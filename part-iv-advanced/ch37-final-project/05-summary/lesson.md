## Summary: Final project

The GL checker is small, but every part leans on a course idea, and the parts depend on one another in a straight line.

* **Money is kept in whole cents.** Exact integers make the reconciliation trustworthy, and text is converted only at the edges.
* **Lookups return results, not exceptions.** A discriminated union forces the caller to check `ok` before reading the success fields.
* **The reconciliation collects every problem.** Reporting all errors at once saves the reviewer repeated rounds of correction.
* **The report reuses the checks.** One reconciliation function serves both the status line and the checker, so they cannot disagree.
* **Notes are data.** User text is printed as text and never built into markup.

### Check your understanding

*These questions are written for this course.*

```quiz
Why does the checker convert amounts to cents before adding them?
○ Because the checker cannot add decimal numbers.
→ Not quite. Decimal numbers can be added, but not always exactly.
◉ Because binary decimals can drift by a fraction of a cent, while whole cents add exactly.
→ Right. An exact total is what makes the comparison with the invoice reliable.
○ Because cents are larger than dollars.
→ Not quite. The reason is exactness.
```

```quiz
Why does `lookupGlCode` return a result rather than throwing an error for an inactive code?
○ Because throwing is not allowed in TypeScript.
→ Not quite. Throwing is allowed, and the choice here is about how the outcome is handled.
◉ Because an inactive code is an expected outcome, and the union forces every caller to handle it.
→ Right. Returning the failure as data keeps it visible in the types.
○ Because the lookup must always succeed.
→ Not quite. The lookup can fail, and the result says so.
```

```quiz
Which change would make the report disagree with the checker?
○ Calling `reconcile` from `buildReport`.
→ Not quite. Sharing the function is what keeps them consistent.
◉ Writing a separate status test inside `buildReport` with different rules.
→ Right. Two rules for the same question can give two different answers.
○ Adding a note to the report.
→ Not quite. Notes do not affect the reconciliation.
```
