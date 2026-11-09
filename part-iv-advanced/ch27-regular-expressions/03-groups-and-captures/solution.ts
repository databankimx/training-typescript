// Each pair of parentheses captures one part of the match.
const isoDate: RegExp = /^(\d{4})-(\d{2})-(\d{2})$/;

const match: RegExpExecArray | null = isoDate.exec("2026-11-09");

if (match !== null) {
  // Index 0 is the whole match, so the parts start at index 1. The leading comma skips index 0.
  const [, year, month, day] = match;
  console.log(`${day}/${month}/${year}`);
}
