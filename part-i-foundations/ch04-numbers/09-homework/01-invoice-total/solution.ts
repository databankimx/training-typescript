const first: number = 19.99;
const second: number = 24.5;
const taxRate: number = 0.0825;

const subtotal: number = first + second;
const total: number = subtotal + subtotal * taxRate;

console.log(`Total: ${total.toFixed(2)}`);
