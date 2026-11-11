// Money is stored as a whole number of cents, so every addition is exact.
function toCents(text: string): number {
  return Math.round(Number(text) * 100);
}

// Turns a count of cents back into dollars and cents for display. Negative amounts are not needed here.
function formatCents(cents: number): string {
  const dollars: number = Math.floor(cents / 100);
  const remainder: number = cents % 100;
  return `$${dollars}.${String(remainder).padStart(2, "0")}`;
}

const amount: number = toCents("19.99");
console.log(amount);
console.log(formatCents(amount));
