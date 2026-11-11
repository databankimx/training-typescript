// A fixed replacement: every hyphen becomes a slash.
const isoDate: string = "2026-11-09";
console.log(isoDate.replace(/-/g, "/"));

// A function replacement: each match is passed in, and the returned text takes its place.
const title: string = "hello world";
console.log(title.replace(/\b\w/g, (letter: string): string => letter.toUpperCase()));
