# Text as bytes

Storage and networks carry bytes, not characters. `TextEncoder` turns a string into UTF-8 bytes, and `TextDecoder` turns bytes back into a string. UTF-8 uses one byte for the ASCII letters and up to four for other characters, so the byte count of a string is not its character count.

> **Coming from JavaScript:** `TextEncoder` and `TextDecoder` are the same in both languages. The `Uint8Array` label on the encoded result is the TypeScript part, and it says the bytes are unsigned.

## The program

```typescript
const text: string = "Hé";

const bytes: Uint8Array = new TextEncoder().encode(text);
console.log(bytes.length);

console.log(new TextDecoder().decode(bytes));
```

```text
3
Hé
```

`H` is one byte, and `é` takes two. The string has two characters, but its encoding has three bytes, so `bytes.length` is 3. Decoding the bytes returns the original text.

## Why the difference matters

A limit set in bytes, such as the size of a message field, must be checked against the encoded length, not the character count. `"Hé".length` in JavaScript is 2 here, so counting characters would undercount the space the text needs.

## Try it yourself

- Encode `"naïve"`. How many bytes does it take, and why?
- Encode an emoji such as `"😀"`. How many bytes does it take?

## Quiz

```quiz
Why is the encoded length of `"Hé"` 3 bytes, when the string has two characters?
○ Because the encoder adds a byte at the end.
→ Not quite. The encoder adds no padding.
◉ Because `é` needs two bytes in UTF-8, and `H` needs one.
→ Right. Characters beyond plain ASCII can take more than one byte.
○ Because the decoder needs an extra byte to read the text.
→ Not quite. Decoding is the reverse step, and it adds nothing.
```
