## Summary: Typed arrays

Typed arrays store binary data in a compact, fixed-size form.

* **Each typed array has a fixed element size.** A `Uint8Array` slot holds one byte, and values outside the range wrap around.
* **Views share a buffer.** Two views of one `ArrayBuffer` read the same bytes, and the byte order decides multi-byte values.
* **Text becomes bytes through an encoder.** UTF-8 uses one to four bytes per character, so the byte count can differ from the character count.
* **Limits on binary data are counted in bytes.** Check the encoded length, not the string length.

### Check your understanding

*These questions are written for this course.*

```quiz
A `Uint8Array` slot is set to 300. What does it hold?
○ 300
→ Not quite. A byte cannot hold 300.
◉ 44, because 300 wraps around the 256 possible byte values.
→ Right. The value is reduced modulo 256, so 300 becomes 44.
○ The assignment is refused.
→ Not quite. The assignment wraps and does not fail.
```

```quiz
What does a `Uint16Array` view read from two bytes of a shared buffer?
○ Only the first byte.
→ Not quite. The view reads both bytes as one number.
◉ One 16-bit number, built from the two bytes in the computer's byte order.
→ Right. The two bytes form a single word.
○ Two separate numbers.
→ Not quite. A 16-bit element is one value made from two bytes.
```

```quiz
A field allows 10 bytes of text. Which length should be checked?
○ The number of characters.
→ Not quite. Characters and bytes differ for text beyond plain ASCII.
◉ The encoded length in UTF-8 bytes.
→ Right. The field's limit is in bytes, so the encoded length is what must fit.
○ The length of the decoded text.
→ Not quite. Decoding gives back the same text, not the byte count.
```
