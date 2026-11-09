# Errors in async code

A promise that fails is **rejected**, and the error is passed along with it. In an `async` function, `await` on a rejected promise throws that error at the line where it was awaited. That means the `try` and `catch` from the error handling chapter work unchanged around `await`.

> **Coming from JavaScript:** rejection and `try` with `await` are the same in both languages. The `error: unknown` label and the `instanceof` check are the TypeScript part, as before.

## The program

The program is already in `main.ts`:

```ts
function loadUser(id: number): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    setTimeout(() => {
      if (id === 0) {
        reject(new Error("No user with id 0"));
      } else {
        resolve(`user ${id}`);
      }
    }, 50);
  });
}

async function main(): Promise<void> {
  try {
    console.log(await loadUser(7));
    console.log(await loadUser(0));
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(`Failed: ${error.message}`);
    }
  }
}

void main();
```

Press **Run**. You should see:

```
user 7
Failed: No user with id 0
```

The first `await` succeeds, so `user 7` is printed. The second promise is rejected, so the `await` throws, and control jumps to the `catch` block. The line that would print the second user never runs.

## Where the error can be caught

A rejection can only be caught where the `await` is inside a `try` block. If you leave the `await` outside one, the error escapes the function, and the program reports it as unhandled. Put the `try` around the awaits that can fail, and keep the handling close to the work it protects.

## Try it

- Change `loadUser(0)` to `loadUser(12)`, and run. Does the `catch` block run?
- Move the second `await` out of the `try` block, into a separate line after the `catch`. Run the program. What's reported, and why?
- Change `reject(new Error(...))` to `reject("missing")`, and run. What does the `catch` block print, and why?

## Quiz

```quiz
What happens when `await` is used on a rejected promise?
○ The function continues, and the value is `undefined`.
→ Not quite. A rejected promise doesn't give a value. `await` throws the error instead.
◉ `await` throws the error at that line, so an enclosing `catch` can handle it.
→ Right. A rejection becomes an ordinary thrown error at the `await`.
○ The program stops at once, with no way to catch the error.
→ Not quite. A `try` around the `await` catches the error.
```

```quiz
Why must the second `await` be inside the `try` block to be caught?
○ Because `try` blocks only hold one `await`.
→ Not quite. A `try` block can hold as many statements as it needs.
◉ Because an error can only be caught in a `catch` that surrounds the code that throws it.
→ Right. The `catch` must be around the `await` for the rejection to reach it.
○ Because promises are always caught automatically.
→ Not quite. Promises are not caught automatically, so the `try` is needed.
```
