const later: Promise<number> = new Promise<number>((resolve) => {
  setTimeout(() => resolve(42), 100);
});

later.then((value: number) => {
  console.log(`Got ${value}`);
});

console.log("waiting");
