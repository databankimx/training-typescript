const recipient: string = "  ada  ";
const name: string = recipient.trim();
const capitalized: string = name.charAt(0).toUpperCase() + name.slice(1);

console.log(`Dear ${capitalized}, your report is ready.`);
