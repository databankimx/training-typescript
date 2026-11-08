const title: string = "  monthly sales  ";
const cleaned: string = title.trim();
const capitalized: string = cleaned.charAt(0).toUpperCase() + cleaned.slice(1);

console.log(capitalized);
console.log(cleaned.length);
