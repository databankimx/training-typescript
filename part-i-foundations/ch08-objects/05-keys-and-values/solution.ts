const scores: Record<string, number> = { maths: 90, art: 75 };

console.log(Object.keys(scores).join(", "));
console.log(Object.values(scores).length);

for (const subject of Object.keys(scores)) {
  console.log(`${subject} ${scores[subject]}`);
}
