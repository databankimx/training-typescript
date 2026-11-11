## Summary: Modules

A module is a file with a boundary. What it exports is shared, and everything else stays inside.

* **`export` shares a name, and `import` brings it in.** The names in braces must match the exports exactly.
* **`import type` brings in a type-only name.** Interfaces and type aliases have no code, so the import loads nothing.
* **Private names stay inside the module.** A rule or constant that isn't exported can change without affecting any caller.
* **The checker enforces the boundary.** Importing a name that isn't exported, or a value without the right keyword, is reported before the program runs.

### Check your understanding

*These questions are written for this course.*

```quiz
Which line brings the interface `Order` into a file, and loads no code for it?
○ `import { Order } from "./orders.ts";`
→ Not quite. With the course's settings, an interface needs a type-only import.
◉ `import type { Order } from "./orders.ts";`
→ Right. `import type` brings in the type, and nothing that runs.
○ `import Order from "./orders.ts";`
→ Not quite. That's a default import, and `Order` is a named type in this module.
```

```quiz
A module has `const LIMIT = 10;` without `export`. What can another file do with `LIMIT`?
○ Read it, because all constants are shared.
→ Not quite. Only exported names can be imported.
◉ Nothing. The name is private to its module.
→ Right. Without `export`, the name is invisible outside the file.
○ Change it, because constants are writable.
→ Not quite. Other files can't reach the name at all.
```

```quiz
Why is a module's boundary useful when a rule changes?
○ Because the checker updates every file automatically.
→ Not quite. The checker doesn't edit files. The boundary limits what must change.
◉ Because the change can be made inside the module, without breaking the files that import it.
→ Right. Callers depend only on the exports, so private rules can change freely.
○ Because boundaries make the program run faster.
→ Not quite. The reason is that the change stays inside the module.
```
