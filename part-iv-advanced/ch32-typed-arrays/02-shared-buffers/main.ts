// Two views of one block of four bytes. Writing through either view changes what the other one reads.
const buffer: ArrayBuffer = new ArrayBuffer(4);
const bytes: Uint8Array = new Uint8Array(buffer);
const words: Uint16Array = new Uint16Array(buffer);

bytes[0] = 1;
bytes[1] = 2;

// On the common little-endian computers, the first byte is the low part of a 16-bit word: 1 + 2 × 256.
console.log(words[0]);
console.log(bytes.join(", "));
