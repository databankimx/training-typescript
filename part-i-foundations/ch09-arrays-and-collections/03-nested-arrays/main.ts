const grid: number[][] = [
  [1, 2, 3],
  [4, 5, 6],
];

console.log(grid[1][2]);
console.log(grid.length);

for (const row of grid) {
  console.log(row.join(" "));
}
