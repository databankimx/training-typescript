const recipient: string = "  ada  ";
const name: string = recipient.trim();
const capitalised: string = name.charAt(0).toUpperCase() + name.slice(1);

console.log(`Dear ${capitalised}, your report is ready.`);
