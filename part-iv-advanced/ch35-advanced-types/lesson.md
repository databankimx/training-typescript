# Ch35 - Advanced types

The types you have used so far describe values. TypeScript also has types that describe other types: a type that picks one of two outcomes based on a condition, a type that rewrites every property of an object, and a type that builds text patterns. These are the tools behind the utility types from the generics chapter, and they let a library describe its own shape precisely.

Advanced types do not change what a program prints. They change what the checker will accept, and they catch mistakes that a simpler type would miss. The lessons here pair each type with a value that the checker verifies, so the type's effect is visible in the code.

## What you'll learn

1. How a conditional type chooses between two types, and how `infer` pulls out a part of a type.
2. How a mapped type rewrites every property of an object type.
3. How a template literal type describes text with a fixed shape.

The chapter ends with a summary, and a homework exercise.
