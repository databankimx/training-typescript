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

// TODO: replace this placeholder. Each value is the sum of the two before it, starting from 0 and 1, and the sequence never ends.
function* fibonacci(): Generator<number> {
  yield 0;
}

console.log(take(fibonacci(), 8).join(", "));
