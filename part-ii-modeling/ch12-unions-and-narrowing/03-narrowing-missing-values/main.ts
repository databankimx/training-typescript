function greet(name: string | null): string {
  if (name === null) {
    return "Hello, stranger";
  }
  return `Hello, ${name}`;
}

function firstWord(text: string | undefined): string {
  if (!text) {
    return "(empty)";
  }
  return text.split(" ")[0];
}

console.log(greet(null));
console.log(greet("Ada"));
console.log(firstWord("Grace Hopper"));
console.log(firstWord(undefined));
