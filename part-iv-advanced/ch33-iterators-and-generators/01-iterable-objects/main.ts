// An object is iterable when it has a [Symbol.iterator] method. That method returns an iterator, whose next method
// gives one result at a time, and says done: true when there are no more values.
const range = {
  from: 1,
  to: 3,
  [Symbol.iterator](): Iterator<number> {
    let current: number = this.from;
    const last: number = this.to;
    return {
      next: (): IteratorResult<number> => {
        if (current <= last) {
          const value: number = current;
          current++;
          return { value, done: false };
        }
        return { value: undefined, done: true };
      },
    };
  },
};

for (const n of range) {
  console.log(n);
}
