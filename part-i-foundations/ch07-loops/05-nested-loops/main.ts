for (let row: number = 1; row <= 3; row++) {
  let line: string = "";
  for (let col: number = 1; col <= 3; col++) {
    line = line + `${row * col} `;
  }
  console.log(line.trim());
}
