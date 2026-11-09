# Money in whole cents

Floating-point numbers cannot hold every decimal amount exactly. `0.1 + 0.2` is not `0.3` in binary arithmetic, and a long list of such sums can drift by a cent or more. An accounts checker cannot tolerate that, so it stores each amount as a whole number of cents. Addition on whole numbers is exact, and the text form is produced only at the edges, for input and output.

> **Coming from JavaScript:** the arithmetic is the same in both languages. The `number` labels document that the values are whole cents, and the `string` parameter marks where text enters the program.

## The program

```typescript
function toCents(text: string): number {
  return Math.round(Number(text) * 100);
}

function formatCents(cents: number): string {
  const dollars: number = Math.floor(cents / 100);
  const remainder: number = cents % 100;
  return `$${dollars}.${String(remainder).padStart(2, "0")}`;
}

const amount: number = toCents("19.99");
console.log(amount);
console.log(formatCents(amount));
```

```text
1999
$19.99
```

`toCents` rounds after multiplying, which removes the small error that multiplication by 100 can introduce, so `"19.99"` becomes exactly 1999. `formatCents` splits the count into dollars and remainder, and `padStart` keeps a single-digit remainder at two places, so 1905 prints as `$19.05`.

## Where the conversion happens

Convert once, at the boundary where text enters the program. From then on every amount is cents, and the checker never needs to think about decimals. Converting back is needed only for display.

## Try it yourself

- Print `formatCents(toCents("0.05"))`. Why does the output keep the leading zero in the dollar part?
- Print `toCents("0.1") + toCents("0.2")`, and compare it with `0.1 + 0.2` on its own.

## Quiz

```quiz
Why does `toCents` multiply by 100 and then round?
○ Because the input text cannot be read as a number without rounding.
→ Not quite. `Number` reads the text directly, so rounding is not needed for reading.
◉ Because the multiplication can leave a tiny error, and rounding restores the exact whole number of cents.
→ Right. Rounding after the multiplication gives the exact cent count.
○ Because whole cents are always larger than dollars.
→ Not quite. The reason is exactness, not size.
```
