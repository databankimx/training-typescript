// A product code is two capital letters, a hyphen, and four digits, such as AB-1234.
function isValidCode(code: string): boolean {
  return /^[A-Z]{2}-\d{4}$/.test(code);
}

console.log(isValidCode("AB-1234"));
console.log(isValidCode("ab-1234"));
