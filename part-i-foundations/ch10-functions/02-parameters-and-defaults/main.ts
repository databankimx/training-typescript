function greet(name: string, greeting: string = "Hello"): string {
  return `${greeting}, ${name}!`;
}

function shout(message: string, times?: number): string {
  return message.toUpperCase().repeat(times ?? 1);
}

console.log(greet("Ada"));
console.log(greet("Grace", "Welcome"));
console.log(shout("hi", 2));
console.log(shout("hi"));
