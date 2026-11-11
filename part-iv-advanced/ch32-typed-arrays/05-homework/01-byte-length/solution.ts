// The encoder gives the UTF-8 bytes, so its length is the number of bytes the text needs.
function byteLength(text: string): number {
  return new TextEncoder().encode(text).length;
}

console.log(byteLength("naïve"));
console.log(byteLength("abc"));
