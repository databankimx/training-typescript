function divide(a: number, b: number): number {
  if (b === 0) {
    throw new Error("Cannot divide by zero");
  }
  return a / b;
}

try {
  console.log(divide(10, 2));
  console.log(divide(1, 0));
} catch (error: unknown) {
  if (error instanceof Error) {
    console.log(error.message);
  }
}
