// Two public signatures: a number formats as its text, and a date formats as its ISO day.
function format(value: number): string;
function format(value: Date): string;
function format(value: number | Date): string {
  return value instanceof Date ? value.toISOString().slice(0, 10) : String(value);
}

console.log(format(42));
console.log(format(new Date(Date.UTC(2026, 10, 9))));
