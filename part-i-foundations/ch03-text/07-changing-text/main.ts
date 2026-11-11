const path: string = "reports/2026/sales.csv";

console.log(path.replace("sales", "returns"));

const parts: string[] = path.split("/");
console.log(parts.length);
console.log(parts[2]);

console.log("=".repeat(10));
console.log("7".padStart(3, "0"));
console.log(String.raw`C:\new\folder`);
