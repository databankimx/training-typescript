// makeGreeter returns a function. The returned function remembers greeting, even after makeGreeter has finished.
function makeGreeter(greeting: string): (name: string) => string {
  return (name: string): string => `${greeting}, ${name}!`;
}

const hello = makeGreeter("Hello");
const hi = makeGreeter("Hi");

console.log(hello("Ada"));
console.log(hi("Grace"));
