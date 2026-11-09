// The natural numbers never run out. The generator is only ever run as far as the consumer asks.
function* naturals(): Generator<number> {
  let n: number = 1;
  while (true) {
    yield n;
    n++;
  }
}

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

console.log(take(naturals(), 5).join(", "));
