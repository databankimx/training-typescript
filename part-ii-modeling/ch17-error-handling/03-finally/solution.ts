function readName(text: string): string {
  try {
    return JSON.parse(text).name;
  } catch (error: unknown) {
    return "default";
  } finally {
    console.log("checked config");
  }
}

console.log(readName('{"name":"Ada"}'));
console.log(readName("oops"));
