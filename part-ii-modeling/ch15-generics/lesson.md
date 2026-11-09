# Ch15 - Generics

Many functions and types work the same way whatever they hold. Finding the first item in a list is the same job for a list of numbers as for a list of names. A wrapper that holds a value is the same whether the value is a number or a customer. Writing a separate version for each type would repeat the code, and losing the type information would weaken the checker. **Generics** solve that: they let a function or a type take a type as a parameter, so one definition works for many types and the checker still tracks each one.

The same idea gives you the **utility types**, built into TypeScript, which transform an existing type: making every property optional, making them all read-only, or keeping only some of them.

## What you'll learn

1. How a generic function takes a type parameter, and returns the same type it was given.
2. How a generic type, such as a box that holds a value, works for any type.
3. How a constraint limits the types a parameter may be, so the function can rely on their properties.
4. How the utility types `Readonly`, `Partial`, and `Pick` transform an existing type.

The chapter ends with a summary, and two homework exercises.
