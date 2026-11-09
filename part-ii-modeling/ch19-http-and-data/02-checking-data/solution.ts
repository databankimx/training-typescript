interface User {
  name: string;
  age: number;
}

function isUser(value: unknown): value is User {
  return (
    typeof value === "object" &&
    value !== null &&
    "name" in value &&
    typeof value.name === "string" &&
    "age" in value &&
    typeof value.age === "number"
  );
}

const good: unknown = JSON.parse('{"name":"Ada","age":36}');
if (isUser(good)) {
  console.log(`${good.name} is ${good.age}`);
}

const bad: unknown = JSON.parse('{"name":"Ada","age":"thirty"}');
console.log(isUser(bad) ? "valid" : "invalid");
