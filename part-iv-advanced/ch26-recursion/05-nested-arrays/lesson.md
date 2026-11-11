# Recursing through nested arrays

Real data nests. A menu has sections, a section has items, and an item can have sub-items. A recursive function handles nested data without knowing the depth in advance: it deals with the items it can answer directly, and it hands each nested list to itself.

> **Coming from JavaScript:** the recursion is the same in both languages. The recursive type alias `NestedNumbers` is the TypeScript part, and it lets the checker follow the nesting.

## A type that refers to itself

```typescript
type NestedNumbers = (number | NestedNumbers)[];
```

The type says: a list whose items are either numbers, or lists of the same kind. TypeScript allows a type alias to refer to itself this way, because the reference is inside an array, which is a finite step.

## The recursive function

```typescript
function sumNested(items: NestedNumbers): number {
  let total: number = 0;
  for (const item of items) {
    total = total + (typeof item === "number" ? item : sumNested(item));
  }
  return total;
}

const data: NestedNumbers = [1, [2, 3], [4, [5]]];
console.log(sumNested(data));
```

```text
15
```

The `typeof item === "number"` check is the narrowing from earlier chapters. In the true branch, `item` is a number. In the false branch, the checker knows `item` must be a nested list, so `sumNested(item)` is allowed. Without the check, the call would be refused, because a plain number is not a list.

Here the base case is not a separate `if`. It is the number itself: a number is added directly, and recursion stops there.

## Try it yourself

- Add a deeper list, such as `[6, [7, [8, [9]]]]`, to `data`. Does the total change as you expect?
- Remove the `typeof` check and call `sumNested(item)` unconditionally. What does the checker report?

## Quiz

```quiz
Why does the `typeof item === "number"` check come before the recursive call?
○ Because recursive calls are not allowed on arrays.
→ Not quite. Recursive calls on arrays are allowed, and that is what the function does.
◉ Because a number cannot be passed to `sumNested`, and the check narrows the item to the right case.
→ Right. The check tells the checker which items are lists and which are numbers.
○ Because `typeof` makes the function faster.
→ Not quite. Speed is not the reason.
```
