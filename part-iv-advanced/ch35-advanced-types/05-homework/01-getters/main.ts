interface Person {
  name: string;
  age: number;
}

// TODO: write Getters<T>, a mapped type where each key K of T becomes a function returning T[K].
// The placeholder below makes the program compile until you replace it.
type Getters<T> = { [K in keyof T]: () => unknown };

const person: Person = { name: "Ada", age: 36 };

// Build the getters by hand for the placeholder. Replace this with the mapped type's version.
const getters: Getters<Person> = {
  name: (): unknown => person.name,
  age: (): unknown => person.age,
};

console.log(getters.name());
console.log(getters.age());
