# Importing types

Some names in a module are types only: an interface, or a type alias. They describe values, and they don't exist when the program runs. `import type` brings in those names and nothing else, so the program doesn't load code that isn't needed. The course's settings require it, so a plain import of a type is reported.

> **Coming from JavaScript:** `import type` is TypeScript-only, and Node removes it before the program runs. Plain JavaScript has no equivalent, because JavaScript has no types to import.

## The files

`customer.ts` exports an interface, which is a type and not a value:

```ts
export interface Customer {
  name: string;
  city: string;
}
```

`main.ts` imports only the type, and uses it to label a value:

```ts
import type { Customer } from "./customer.ts";

const buyer: Customer = { name: "Ada", city: "Dallas" };

console.log(`${buyer.name} in ${buyer.city}`);
```

Press **Run**. You should see `Ada in Dallas`.

The `import type` line names the interface, and the label `Customer` on `buyer` uses it. Because the import is type-only, the program never needs anything from `customer.ts` at run time. An interface has no code to load, so none is loaded.

## Why the keyword is required

The course's settings turn on `verbatimModuleSyntax`. That setting asks you to say when an import is only for types, so the reader knows it doesn't bring in code. A plain `import { Customer }` of an interface is reported, and the checker suggests `import type`. The rule keeps the boundary between types and code visible in every file.

## Try it

- Change `import type` to a plain `import`, and press **Check**. What does the checker say?
- Add a `phone: string` property to `Customer` and to `buyer`, and check that the labels still agree.
- Add `export const city: string = "Dallas";` to `customer.ts`, and import it with `import type`. What does the checker say about a value rather than a type?

## Quiz

```quiz
What does `import type { Customer }` bring into `main.ts`?
○ The code that creates customers.
→ Not quite. `Customer` is an interface, which has no code to bring in.
◉ Only the type `Customer`, which exists for the checker.
→ Right. A type-only import brings in the name for labels, and nothing that runs.
○ A copy of `customer.ts` as text.
→ Not quite. Modules are shared by name, and no text is copied.
```

```quiz
Why does the course require `import type` for an interface?
○ Because interfaces are slower to load.
→ Not quite. The reason is the boundary between types and code, not speed.
◉ So a reader can tell at a glance that the import brings in no code.
→ Right. The keyword makes type-only imports visible, so the boundary stays clear.
○ Because `Customer` is written in capitals.
→ Not quite. The capitals don't matter. The keyword marks a type-only import.
```
