const text: string = "Order 12 and order 7 shipped today.";

// The g flag finds every match, not just the first. match returns the whole matches as strings.
const numbers: string[] = text.match(/\d+/g) ?? [];
console.log(numbers.join(", "));

// matchAll gives each match with its captures, so the number can be read in its own context.
for (const found of text.matchAll(/order (\d+)/gi)) {
  console.log(found[1]);
}
