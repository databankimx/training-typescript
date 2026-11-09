// numeric: "auto" lets the formatter use words such as "yesterday" where English has them.
const relative: Intl.RelativeTimeFormat = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

console.log(relative.format(-1, "day"));
console.log(relative.format(3, "day"));
console.log(relative.format(-3, "day"));
