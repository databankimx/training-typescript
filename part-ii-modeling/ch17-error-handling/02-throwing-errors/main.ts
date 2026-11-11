function setAge(age: number): number {
  if (age < 0) {
    throw new Error(`Age cannot be negative: ${age}`);
  }
  return age;
}

try {
  console.log(setAge(30));
  console.log(setAge(-5));
} catch (error: unknown) {
  if (error instanceof Error) {
    console.log(error.message);
  }
}
