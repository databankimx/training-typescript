// TODO: replace this placeholder. makeLimiter(limit) should return a function that is true for the first `limit` calls.
function makeLimiter(limit: number): () => boolean {
  return (): boolean => false;
}

const allowTwo = makeLimiter(2);
console.log(allowTwo(), allowTwo(), allowTwo());
