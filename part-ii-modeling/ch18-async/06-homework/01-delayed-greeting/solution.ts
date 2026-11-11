function wait(ms: number): Promise<void> {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function greet(): Promise<string> {
  await wait(50);
  return "Hello, Ada";
}

async function main(): Promise<void> {
  console.log("start");
  console.log(await greet());
}

void main();
