function countUp(current: number, limit: number): void {
  // The base case: once current passes limit, stop without calling again.
  if (current > limit) {
    return;
  }
  console.log(current);
  // Progress: each call moves current closer to limit.
  countUp(current + 1, limit);
}

countUp(1, 3);
