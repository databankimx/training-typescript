const thirteen: number = 13;

// The same value written three ways: as a binary string, as a binary literal, and parsed back from binary text.
console.log(thirteen.toString(2));
console.log(0b1101);
console.log(Number.parseInt("1101", 2));
