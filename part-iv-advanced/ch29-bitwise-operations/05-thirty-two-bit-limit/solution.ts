// Bitwise operators convert their operands to 32-bit signed integers, so the result wraps around at the limit.
console.log((2 ** 31) | 0);
console.log(2147483647 | 0);
console.log((2147483647 + 1) | 0);
