# Checking data

Data from outside the program is a promise nobody has made to you yet. The server might omit a field, send a number as text, or send something entirely different. A **type guard** is the check that turns that unknown value into one you can trust, as the narrowing chapter showed. The guard runs the tests the program needs, and only when every test passes does the checker accept the value as the typed shape.

> **Coming from JavaScript:** the checks are plain JavaScript, using `typeof`, `in`, and `!== null`. The `value is User` return type is the TypeScript part, and it tells the checker what a `true` result means.

## The program

The program is already in `main.ts`:

```ts
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
```

Press **Run**. You should see:

```
Ada is 36
invalid
```

The guard checks each part of the shape. It confirms the value is an object that isn't `null`, that it has a `name` that is text, and that it has an `age` that is a number. The second record fails the last check, because `"thirty"` is text, so the guard returns `false`.

Inside the `if`, the checker treats `good` as a `User`, so `good.name` and `good.age` are allowed. Outside that block, nothing about `bad` is assumed.

## Checks that match the data

Check only what the program needs. A guard that tests fields the program never reads adds work and can reject good data. A guard that tests too little lets bad data through. The shape should be exactly what the rest of the program depends on.

## Try it

- Change `"thirty"` to `36` in the second record, and run. What's printed?
- Remove the `typeof value.name === "string"` line, and check `{"name":42,"age":36}`. What does the guard return now, and why is that a problem?
- Use `console.log(good.name);` outside the `if` block, and press **Check**. What does the checker report?

## Quiz

```quiz
Why does the guard check `typeof value.name === "string"` and not only `"name" in value`?
○ Because `in` is not allowed on objects.
→ Not quite. `in` works on objects. It checks only that the property exists.
◉ Because the property could exist with the wrong type, and the rest of the program needs text.
→ Right. A property that exists isn't enough. Its type must match the shape too.
○ Because `name` is a reserved word.
→ Not quite. `name` is an ordinary property name.
```

```quiz
Why is `good.name` allowed inside the `if (isUser(good))` block?
○ Because `JSON.parse` always returns a `User`.
→ Not quite. `JSON.parse` returns an unknown value, so the guard is what proves the shape.
◉ Because the guard returned `true`, so the checker narrows `good` to a `User`.
→ Right. The guard's return type tells the checker what a `true` result means.
○ Because the checker trusts all data from JSON.
→ Not quite. The checker trusts only what a guard has proved.
```
