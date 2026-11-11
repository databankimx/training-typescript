type Box<T> = { value: T };

const count: Box<number> = { value: 3 };
const label: Box<string> = { value: "items" };

console.log(`${count.value} ${label.value}`);
