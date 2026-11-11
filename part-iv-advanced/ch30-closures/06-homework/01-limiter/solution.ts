// The count of calls so far lives in the closure. Each call up to the limit is allowed, and later calls are refused.
function makeLimiter(limit: number): () => boolean {
  let calls: number = 0;
  return (): boolean => {
    calls++;
    return calls <= limit;
  };
}

const allowTwo = makeLimiter(2);
console.log(allowTwo(), allowTwo(), allowTwo());
