const title: string = "  monthly sales  ";
const cleaned: string = title.trim();
const capitalised: string = cleaned.charAt(0).toUpperCase() + cleaned.slice(1);

console.log(capitalised);
console.log(cleaned.length);
