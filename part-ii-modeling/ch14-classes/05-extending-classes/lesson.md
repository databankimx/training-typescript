# Extending classes

A class can **extend** another class. The new class, called the subclass, inherits every property and method of the original, which is the base class. It can then add its own, or **override** a method, replacing the base version with one of its own. Extension lets related classes share code, while each one changes only what's different.

> **Coming from JavaScript:** `extends` and method overriding are the same in both languages. The `Animal` and `Dog` declarations are checked against each other, and the labels are the TypeScript part.

## The program

The program is already in `main.ts`:

```ts
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
```

Press **Run**. You should see `Rex barks`.

Here is what happens:

- **`class Dog extends Animal`** makes `Dog` a subclass. It inherits `name`, the constructor, and `describe`.
- **`Dog` has no constructor of its own**, so `new Dog("Rex")` uses the one from `Animal`, and `name` is set to `Rex`.
- **`Dog` overrides `describe`**. The method in `Dog` replaces the one in `Animal` for dogs, so the result is `Rex barks`, not `Rex makes a sound`.

The variable is labelled `Animal`, but the object is a `Dog`. The method called is the one for the object's real class, which is why the output says `barks`. That's the point of overriding: the caller doesn't need to know the exact class.

## When to extend

Extend when the subclass really is a kind of the base class, such as a dog being a kind of animal. If the two classes only share some behavior, an interface is often the better choice, as the previous step showed.

## Try it

- Add a `Cat` class that extends `Animal` and does not override `describe`. Create a cat and print its description. Which message is printed?
- Change `Dog`'s `describe` to call the base version with `super.describe()`, and add the word `loudly`. Print the result.
- Write `const dog: Dog = new Animal("Rex");`, and press **Check**. Why is it refused?

## Quiz

```quiz
When `Dog` doesn't write its own constructor, what happens with `new Dog("Rex")`?
○ The program reports an error.
→ Not quite. A subclass without its own constructor inherits the base constructor.
◉ The inherited constructor from `Animal` runs, and sets `name` to `Rex`.
→ Right. The subclass inherits the constructor, so `Dog` is built the same way as `Animal`.
○ `name` is left empty.
→ Not quite. The inherited constructor sets `name` from the value passed in.
```

```quiz
What does overriding `describe` in `Dog` do?
○ It adds a second `describe` method alongside the first.
→ Not quite. Overriding replaces the inherited method for dogs, rather than adding another.
◉ It replaces the inherited method for dogs, so the dog's version runs.
→ Right. The method called is the one for the object's own class.
○ It deletes `describe` from `Animal`.
→ Not quite. The base class is unchanged, and only dogs use the new method.
```
