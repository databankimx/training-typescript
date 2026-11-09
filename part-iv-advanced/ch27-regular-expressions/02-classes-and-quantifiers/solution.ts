// Three digits, a hyphen, and four digits, with nothing before or after.
const phone: RegExp = /^\d{3}-\d{4}$/;

console.log(phone.test("555-1234"));
console.log(phone.test("55-1234"));
