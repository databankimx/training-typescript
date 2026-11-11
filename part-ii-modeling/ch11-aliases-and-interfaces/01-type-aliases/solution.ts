type Point = { x: number; y: number };

const origin: Point = { x: 0, y: 0 };
const target: Point = { x: 3, y: 4 };

const distanceSquared: number = (target.x - origin.x) ** 2 + (target.y - origin.y) ** 2;
console.log(distanceSquared);
