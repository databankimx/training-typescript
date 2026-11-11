try {
  const data: unknown = JSON.parse("{ bad json");
  console.log(data);
} catch (error: unknown) {
  if (error instanceof Error) {
    console.log(`Could not read: ${error.name}`);
  }
}
