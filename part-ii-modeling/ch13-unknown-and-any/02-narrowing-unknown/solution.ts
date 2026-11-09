function describe(input: unknown): string {
  if (typeof input === "string") {
    return `text of length ${input.length}`;
  }
  if (typeof input === "number") {
    return `number ${input.toFixed(1)}`;
  }
  return "something else";
}

function isUser(value: unknown): value is { name: string } {
  return typeof value === "object" && value !== null && "name" in value;
}

console.log(describe("hello"));
console.log(describe(3.14159));
console.log(describe(null));

const incoming: unknown = { name: "Ada" };
if (isUser(incoming)) {
  console.log(incoming.name);
}
