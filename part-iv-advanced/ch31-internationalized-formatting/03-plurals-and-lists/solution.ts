const rules: Intl.PluralRules = new Intl.PluralRules("en-US");

// The locale decides which counts are "one". English uses "one" only for 1, so 0 and 2 take the plural.
function countLabel(count: number): string {
  return `${count} ${rules.select(count) === "one" ? "item" : "items"}`;
}

console.log(countLabel(1));
console.log(countLabel(2));

const names: Intl.ListFormat = new Intl.ListFormat("en", { style: "long", type: "conjunction" });
console.log(names.format(["Ada", "Grace", "Linus"]));
