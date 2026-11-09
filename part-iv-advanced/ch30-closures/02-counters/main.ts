// The count lives inside makeCounter. Only the returned function can read or change it.
function makeCounter(): () => number {
  let count: number = 0;
  return (): number => {
    count++;
    return count;
  };
}

const next = makeCounter();
next();
next();
console.log(next());

// A second counter has its own count, which starts again from zero.
const other = makeCounter();
console.log(other());
