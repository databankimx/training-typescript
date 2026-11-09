# Arithmetic operators

Numbers are only useful if you can calculate with them. The operators `+`, `-`, `*`, and `/` do what you'd expect from school, and `%` and `**` cover two jobs that come up often: finding a remainder, and raising a number to a power. This step covers each operator, the order in which they're applied, and the shorthand forms the loops chapter used.

> **Coming from JavaScript:** the arithmetic operators are the same in both languages, including their precedence. The checker reads the number labels, and it refuses arithmetic between a number and text.

## The program

The program is already in `main.ts`:

```ts
const price: number = 4;
const quantity: number = 3;

console.log(price + quantity);
console.log(price * quantity + 1);
console.log((price + 1) * quantity);
console.log(10 / 4);
console.log(10 % 4);
console.log(2 ** 5);

let total: number = 10;
total += 5;
total++;
console.log(total);
```

Press **Run**. You should see:

```
7
13
15
2.5
2
32
16
```

Here's what each operator does:

- **`+`** adds, and **`-`** subtracts.
- **`*`** multiplies. Use it instead of writing the sign for multiplication as a letter.
- **`/`** divides. `10 / 4` is `2.5`, because division keeps the decimal part.
- **`%`** gives the remainder after division. `10 % 4` is `2`, because `4` goes into `10` twice, with `2` left over.
- **`**`** raises a number to a power. `2 ** 5` is `2` multiplied by itself five times, which is `32`.

## Order of operations

Multiplication and division are worked out before addition and subtraction. So `price * quantity + 1` is `4 * 3`, which is `12`, plus `1`, giving `13`. Brackets change the order: `(price + 1) * quantity` adds first, giving `5 * 3`, which is `15`.

When you're not sure, add brackets. They cost nothing, and they tell the next reader what you intended.

## Shorthand updates

Changing a value often means reading it, calculating, and storing the answer back. The shorthand forms do that in one step:

- **`total += 5`** adds `5` to `total`. It's the same as `total = total + 5`.
- **`total++`** adds `1`. It's the same as `total = total + 1`, and it's the form the loops chapter used.

`-=`, `*=`, and `/=` work the same way for the other operators.

## Whole-number division

`/` keeps the decimal part, so `10 / 4` is `2.5`. If you need only the whole part, use `Math.floor(10 / 4)`, which gives `2`, or use `%` to find the remainder separately. The rounding step covers `Math.floor` and the other rounding functions in full.

## Try it

- Change `price * quantity + 1` to `price * (quantity + 1)`. What's printed?
- Work out `2 + 3 * 4` by hand, then run it. Did you get the same answer?
- Use `total -= 3;` and then `total *= 2;`, and print `total`. What's the result?

## Quiz

```quiz
What does `2 + 3 * 4` give you?
○ `20`
→ Not quite. Multiplication is worked out first, so `3 * 4` comes before the addition.
◉ `14`
→ Right. The `3 * 4` is worked out first, giving `12`, and then `2` is added.
○ `24`
→ Not quite. That would mean the addition came first, which isn't how the operators are applied.
```

```quiz
What does `10 % 4` give you?
○ `2.5`
→ Not quite. That's `10 / 4`. The `%` operator gives the remainder.
◉ `2`
→ Right. `4` goes into `10` twice, with `2` left over.
○ `0`
→ Not quite. `10` isn't a multiple of `4`, so the remainder is not zero.
```
