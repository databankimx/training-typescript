// Reads values from any iterable until it has count of them, then stops asking for more.
function take(source: Iterable<number>, count: number): number[] {
  const result: number[] = [];
  if (count === 0) {
    return result;
  }
  for (const value of source) {
    result.push(value);
    if (result.length === count) {
      break;
    }
  }
  return result;
}

// Each value is the sum of the two before it. The generator keeps the two latest values as its state.
function* fibonacci(): Generator<number> {
  let previous: number = 0;
  let current: number = 1;
  while (true) {
    yield previous;
    const next: number = previous + current;
    previous = current;
    current = next;
  }
}

console.log(take(fibonacci(), 8).join(", "));
