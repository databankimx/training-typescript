const READ: number = 1;
const WRITE: number = 2;
const EXECUTE: number = 4;

let permissions: number = 0;

permissions |= READ | EXECUTE;
console.log(permissions);

permissions ^= WRITE;
console.log(permissions);

permissions &= ~READ;
console.log(permissions);
