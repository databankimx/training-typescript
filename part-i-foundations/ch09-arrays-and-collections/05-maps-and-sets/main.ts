const ages: Map<string, number> = new Map();
ages.set("Ada", 36);
ages.set("Grace", 85);

console.log(ages.get("Ada"));
console.log(ages.has("Linus"));

const tags: Set<string> = new Set(["blue", "red", "blue"]);
console.log(tags.size);
