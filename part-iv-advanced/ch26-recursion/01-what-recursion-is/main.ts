function countdown(from: number): void {
  if (from === 0) {
    console.log("Liftoff");
    return;
  }
  console.log(from);
  countdown(from - 1);
}

countdown(3);
