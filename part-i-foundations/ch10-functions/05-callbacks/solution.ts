function applyTwice(value: number, step: (n: number) => number): number {
  return step(step(value));
}

const addThree = (n: number): number => n + 3;

console.log(applyTwice(10, addThree));

const names: string[] = ["Ada", "Grace"];
names.forEach((name: string) => console.log(`Hi ${name}`));
