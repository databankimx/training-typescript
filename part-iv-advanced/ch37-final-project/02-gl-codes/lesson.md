# Looking up GL codes

A GL code is only useful if it is active. The checker keeps the active codes in a read-only map, and every lookup returns a result that says either "here is the description" or "here is why this failed". The result is a discriminated union: the `ok` field tells the two shapes apart, so the checker only lets the caller reach `description` after confirming `ok` is `true`.

> **Coming from JavaScript:** the map and the conditional are the same in both languages. The `LookupResult` union and the `ReadonlyMap` label are the TypeScript part. `ReadonlyMap` removes the methods that change the map, so the checker enforces that the list is fixed.

## The program

```typescript
const activeCodes: ReadonlyMap<string, string> = new Map<string, string>([
  ["6100", "Office supplies"],
  ["6200", "Professional services"],
  ["6300", "Facilities and maintenance"],
  ["6400", "Travel and lodging"],
]);

type LookupResult = { ok: true; description: string } | { ok: false; reason: string };

function lookupGlCode(code: string): LookupResult {
  const description: string | undefined = activeCodes.get(code);
  if (description === undefined) {
    return { ok: false, reason: "not an active GL code" };
  }
  return { ok: true, description };
}

function describe(code: string): string {
  const result: LookupResult = lookupGlCode(code);
  return result.ok ? `${code}: ${result.description}` : `${code}: ${result.reason}`;
}

console.log(describe("6100"));
console.log(describe("9999"));
```

```text
6100: Office supplies
9999: not an active GL code
```

`lookupGlCode` returns the description when the code is in the map, and a reason otherwise. In `describe`, the conditional on `result.ok` narrows the type: in the true branch `result.description` exists, and in the false branch `result.reason` exists. Reading `result.description` without that check is refused by the checker.

## Why a result, not an exception

A missing code is an expected outcome, not a program fault, so it is returned as data. The caller is forced to handle it, because the union does not let the success fields be read until the check passes.

## Try it yourself

- Add `["6500", "Insurance"]` to the map, then look it up. Does the output change without any other edit?
- Write `const bad: string = lookupGlCode("6100").description;`, and press Check. What does the checker report?

## Quiz

```quiz
Why can `describe` read `result.description` only inside the true branch?
○ Because the description is always stored in a separate variable.
→ Not quite. The checker tracks which fields exist in each branch.
◉ Because the `ok` check narrows the union, so `description` exists only in the success shape.
→ Right. Narrowing on the discriminant gives each branch its own fields.
○ Because `description` is optional in every case.
→ Not quite. It is required in the success shape, and absent from the failure shape.
```
