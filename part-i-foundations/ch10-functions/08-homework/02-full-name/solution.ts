function capitalize(word: string): string {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function fullName(first: string, last: string): string {
  return `${capitalize(first)} ${capitalize(last)}`;
}

console.log(fullName("ada", "lovelace"));
