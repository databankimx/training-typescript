// A generator function pauses at each yield. The Generator<number> label says what it produces and what it accepts.
function* countUp(limit: number): Generator<number> {
  for (let i: number = 1; i <= limit; i++) {
    console.log(`about to yield ${i}`);
    yield i;
  }
}

// Each value is produced only when the loop asks for it, so the "about to yield" lines interleave with the values.
for (const n of countUp(3)) {
  console.log(`got ${n}`);
}
