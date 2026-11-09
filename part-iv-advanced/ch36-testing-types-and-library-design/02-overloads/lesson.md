# Overloads

An overload gives a function more than one public signature. Each signature describes one way to call it and the result that call returns. The last signature is the implementation, which callers never see, and it must accept every input that the overloads list.

> **Coming from JavaScript:** there is no JavaScript version, because overload signatures are removed before the program runs. The implementation is ordinary JavaScript, and the signatures are the TypeScript part.

## The program

```typescript
function convert(input: string): number;
function convert(input: number): string;
function convert(input: string | number): string | number {
  return typeof input === "string" ? Number(input) : String(input);
}

console.log(convert("42") + 1);
console.log(convert(42).length);
```

```text
43
2
```

`convert("42")` matches the first signature, so its result is typed `number`, and `+ 1` is allowed. `convert(42)` matches the second, so its result is `string`, and `.length` is allowed. Without overloads, a single `string | number` return type would force a cast before either use.

## What the checker enforces

A call that matches neither signature is refused. Write `convert(true)`, and the checker reports that no overload accepts a boolean. The implementation signature is not offered to callers, so its wider type does not leak out.

## Try it yourself

- Write `convert("abc") + 1`, and press Check. What is the type of `convert("abc")`, and does the check pass?
- Remove the second overload `function convert(input: number): string;`, and press Check on `convert(42)`. What does the checker say?

## Quiz

```quiz
Why does the last signature in an overload group not appear to callers?
○ Because it has no return type.
→ Not quite. Its return type is written as `string | number`.
◉ Because it is the implementation, which accepts every overload's inputs, and callers only see the signatures above it.
→ Right. The implementation is hidden so that callers depend only on the public signatures.
○ Because the checker deletes it before the program runs.
→ Not quite. It is kept, and it runs; it is simply not offered to callers.
```
