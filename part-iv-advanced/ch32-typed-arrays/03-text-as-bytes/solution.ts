// "H" takes one byte in UTF-8, and "é" takes two, so the text of two characters is three bytes.
const text: string = "Hé";

const bytes: Uint8Array = new TextEncoder().encode(text);
console.log(bytes.length);

console.log(new TextDecoder().decode(bytes));
