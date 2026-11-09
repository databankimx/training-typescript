# Shared buffers

An `ArrayBuffer` is a block of raw memory. A typed array is a view onto a buffer, and a buffer can have several views with different element sizes. Writing through one view changes the bytes that the other views read.

> **Coming from JavaScript:** buffers and views are the same in both languages. The `ArrayBuffer`, `Uint8Array`, and `Uint16Array` labels are the TypeScript part, and they tell the checker which view is which.

## The program

```typescript
const buffer: ArrayBuffer = new ArrayBuffer(4);
const bytes: Uint8Array = new Uint8Array(buffer);
const words: Uint16Array = new Uint16Array(buffer);

bytes[0] = 1;
bytes[1] = 2;

console.log(words[0]);
console.log(bytes.join(", "));
```

```text
513
1, 2, 0, 0
```

`bytes` is a byte view, and `words` is a view that reads each pair of bytes as one 16-bit number. Setting two bytes through `bytes` gives `words[0]` a value of 513, because on the common little-endian computers the first byte is the low part of the word: `1 + 2 × 256`.

The byte order is a property of the computer, not of the program. A file written on one kind of machine and read on another can give different word values, which is why binary formats state their byte order.

## Try it yourself

- Set `words[1]` to `258`, and print `bytes.join(", ")`. Which bytes changed, and why?
- Create a second `Uint8Array` on `buffer`, and write to it. Does `words[0]` change?

## Quiz

```quiz
Why does `words[0]` read 513 after setting two bytes to 1 and 2?
○ Because `words` stores its own copy of the bytes.
→ Not quite. The two views share the same memory, so there is no copy.
◉ Because the two bytes form one 16-bit word, and the first byte is the low part of that word.
→ Right. Reading the bytes together, in little-endian order, gives 1 + 2 × 256.
○ Because `Uint16Array` always reads the last byte.
→ Not quite. It reads both bytes together.
```
