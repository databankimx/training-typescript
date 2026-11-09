// True only when X and Y are exactly the same type. The comparison uses generic function shapes, which are strict about identity.
type Equals<X, Y> = (<T>() => T extends X ? 1 : 2) extends (<T>() => T extends Y ? 1 : 2) ? true : false;

// A type test is a value whose type must be true. If the types differ, the checker reports the line.
const sameNumber: Equals<number, number> = true;
const differentTypes: Equals<number, string> = false;

// The lines above are the test. Reaching this line means the checker accepted them.
console.log("passed");
