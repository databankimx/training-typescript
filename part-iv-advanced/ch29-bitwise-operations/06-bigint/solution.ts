// BigInt values are written with an n at the end. They are exact, unlike ordinary numbers beyond 2 to the power 53.
const big: bigint = 2n ** 64n;
console.log(big.toString());

const precise: bigint = 9007199254740993n;
console.log(precise.toString());

// An ordinary number cannot tell 9007199254740993 from 9007199254740992, so the comparison is true.
console.log(9007199254740993 === 9007199254740992);
