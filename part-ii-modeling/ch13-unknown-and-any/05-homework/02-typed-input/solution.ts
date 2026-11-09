const input: unknown = "42";

if (typeof input === "string") {
  console.log(Number(input) * 2);
} else {
  console.log("Not text");
}
