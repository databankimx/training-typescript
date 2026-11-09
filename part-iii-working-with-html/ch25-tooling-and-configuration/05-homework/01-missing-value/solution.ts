const values: number[] = [1, 4, 6];
const found = values.find((item: number) => item > 5);

if (found !== undefined) {
  console.log(`Found ${found}`);
} else {
  console.log("Not found");
}
