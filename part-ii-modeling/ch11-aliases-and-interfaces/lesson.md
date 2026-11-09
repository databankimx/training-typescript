# Ch11 · Aliases and interfaces

Once a program has more than a handful of values, the same shapes start to appear everywhere. Every customer has a name and a city, every order has an ID and a total, every point has an x and a y. Writing the shape out in full each time is slow, and a small change means finding every copy. Aliases and interfaces let you give a shape a name, write it once, and use the name wherever it's needed. This is where modeling starts: you describe your data once, and the checker holds the rest of the program to that description.

## What you'll learn

1. How a type alias gives a shape, or any other type, a name.
2. How an interface describes an object's shape, and how one interface can extend another.
3. When to choose an alias and when to choose an interface.
4. How optional and read-only properties change what an object must contain.

The chapter ends with a summary, and two homework exercises.
