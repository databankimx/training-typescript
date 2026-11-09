// A Uint8Array holds unsigned bytes, 0 to 255. Each slot has the same fixed size, whatever value it is given.
const bytes: Uint8Array = new Uint8Array(4);

bytes[0] = 255;
bytes[1] = 256;   // one past the largest byte wraps to 0
bytes[2] = -1;    // a negative value wraps to 255

console.log(bytes.join(", "));
