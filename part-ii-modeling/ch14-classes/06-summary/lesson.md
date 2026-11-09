## Summary: Classes

A class keeps the data for an object and the rules for changing it in one place.

* **A class is a blueprint, and `new` builds an instance.** The constructor sets the starting values, and `this` refers to the instance.
* **Methods change the instance they're called on.** Their `this` is that object, so each instance keeps its own state.
* **`private` and `readonly` protect the data.** Private properties change only through the class's own methods, and readonly ones are set once.
* **`implements` promises an interface's methods.** The checker verifies the promise where the class is written.
* **`extends` shares code, and overriding changes one behavior.** The method run is the one for the object's own class.

### Check your understanding

*These questions are written for this course.*

```quiz
What does `private balance: number;` allow?
○ Any code to read or write `balance`.
→ Not quite. Private properties are kept from code outside the class.
◉ Only the class's own methods to read and write `balance`.
→ Right. Outside code is refused, so changes must go through the class.
○ Only the constructor to read `balance`.
→ Not quite. Methods inside the class can use it as well.
```

```quiz
A class `Rectangle` says `implements Shape`, but has no `area` method. Where does the checker report the problem?
○ At the first place the rectangle is used.
→ Not quite. The checker verifies the promise where the class is written.
◉ In the `Rectangle` class, where the promise is made.
→ Right. The missing method is reported where `implements` is written.
○ Nowhere, because the program still runs.
→ Not quite. The checker reports the broken promise before the program runs.
```

```quiz
What does `class Dog extends Animal` give `Dog`?
○ Nothing. `extends` only copies the class name.
→ Not quite. `extends` gives the subclass the base class's properties and methods.
◉ The base class's properties and methods, which it can then override or add to.
→ Right. A subclass inherits the base, and it can change or extend what it inherits.
○ Its own copy of every instance of `Animal`.
→ Not quite. Inheritance shares the definitions, not the instances.
```
