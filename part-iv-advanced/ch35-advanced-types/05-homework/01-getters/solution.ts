interface Person {
  name: string;
  age: number;
}

// Each key K of T becomes a function that returns the type of T[K], so each getter returns its property's own type.
type Getters<T> = { [K in keyof T]: () => T[K] };

const person: Person = { name: "Ada", age: 36 };

const getters: Getters<Person> = {
  name: (): string => person.name,
  age: (): number => person.age,
};

console.log(getters.name());
console.log(getters.age());
