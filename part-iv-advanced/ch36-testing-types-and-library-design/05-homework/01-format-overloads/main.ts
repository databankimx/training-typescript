// TODO: add overload signatures so format(value: number): string and format(value: Date): string both work.
// The implementation below handles only numbers, which is a start. Extend it for dates.
function format(value: number): string {
  return String(value);
}

console.log(format(42));
