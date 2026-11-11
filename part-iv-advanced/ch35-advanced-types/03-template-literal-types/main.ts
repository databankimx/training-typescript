// A template literal type is a string type with a fixed shape. Here, any text that starts with "/users/".
type UserRoute = `/users/${string}`;

// Each size pairs with the prefix, so the union holds every combination.
type Size = "small" | "large";
type ButtonClass = `btn-${Size}`;

const route: UserRoute = "/users/ada";
const button: ButtonClass = "btn-small";

console.log(route);
console.log(button);
