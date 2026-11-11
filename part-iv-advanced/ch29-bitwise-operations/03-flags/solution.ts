// Each flag is one bit. The mask for a flag is a number with only that bit set.
const READ: number = 1 << 0;      // 001
const WRITE: number = 1 << 1;     // 010
const EXECUTE: number = 1 << 2;   // 100

let permissions: number = READ | WRITE;   // set two flags
console.log(permissions);                  // 3

permissions |= EXECUTE;                    // set a flag
console.log(permissions);                  // 7

console.log((permissions & WRITE) !== 0); // test a flag

permissions &= ~WRITE;                     // clear a flag
console.log(permissions);                  // 5

permissions ^= READ;                       // toggle a flag
console.log(permissions);                  // 4
