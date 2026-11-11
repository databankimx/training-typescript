// Two public signatures: text in gives a number out, and a number in gives text out.
// The last signature is the implementation. Callers only see the first two.
function convert(input: string): number;
function convert(input: number): string;
function convert(input: string | number): string | number {
  return typeof input === "string" ? Number(input) : String(input);
}

// Each call is checked against its own signature, so the result type is known at the call site.
console.log(convert("42") + 1);
console.log(convert(42).length);
