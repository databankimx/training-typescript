# Homework: access check

A venue lets people in if they are paying members, or if they're staff. Membership and payment are separate questions, and both count only when they're both yes.

> **Coming from JavaScript:** the operators are the same in both languages. The `: boolean` labels are the TypeScript part.

## The task

Here is the starting code, which prints whether the first person is a member:

```ts
const isMember: boolean = true;
const hasPaid: boolean = false;
const isStaff: boolean = false;

console.log(isMember);
```

Start from the code above, in your own file, and change it so that it prints whether the person can enter. A person can enter when they're a member who has paid, or when they're staff.

With the values above, the answer should be `false`, because this member hasn't paid and isn't staff.

## Hints

- "Paid" and "member" are both needed, so combine them with `&&`.
- "Or staff" can be added with `||`. Brackets around the first pair make the grouping clear.

## When you're stuck

Show the solution. It's a spoiler, so give it a proper attempt in your own file first.

## Quiz

```quiz
Why use brackets around `isMember && hasPaid`?
○ Because `&&` can't be used with booleans.
→ Not quite. `&&` works on booleans. The brackets are about how the expression reads.
◉ To make the grouping clear to the next reader. `&&` binds more tightly than `||`, so the brackets aren't required, but they show the intent.
→ Right. The brackets say which checks belong together, even where the rules would give the same answer without them.
○ Because brackets are required around every condition.
→ Not quite. They're a way of making the intent clear, not a rule for every condition.
```
