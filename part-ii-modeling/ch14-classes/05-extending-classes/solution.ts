class Animal {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  describe(): string {
    return `${this.name} makes a sound`;
  }
}

class Dog extends Animal {
  describe(): string {
    return `${this.name} barks`;
  }
}

const dog: Animal = new Dog("Rex");
console.log(dog.describe());
