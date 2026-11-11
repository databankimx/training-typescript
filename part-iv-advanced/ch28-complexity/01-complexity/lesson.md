# Counting the work

Complexity starts with a simple question: when the input doubles, how much more work does the program do? A loop over the items does one step for each item. Doubling the items doubles the steps. A loop inside another loop does one step for every pair of items, so doubling the input quadruples the steps.

> **Coming from JavaScript:** the loops are identical in both languages. The `number` labels on the counters are the TypeScript part.

## The program

```typescript
function countLinear(n: number): number {
  let steps: number = 0;
  for (let i: number = 0; i < n; i++) {
    steps++;
  }
  return steps;
}

function countNested(n: number): number {
  let steps: number = 0;
  for (let i: number = 0; i < n; i++) {
    for (let j: number = 0; j < n; j++) {
      steps++;
    }
  }
  return steps;
}

console.log(countLinear(10), countLinear(20));
console.log(countNested(10), countNested(20));
```

```text
10 20
100 400
```

The single loop goes from 10 to 20 steps, which doubles. The nested loop goes from 100 to 400, which quadruples. Neither number is a timing, so the output is the same on every computer.

## Why the shape matters more than the count

Complexity ignores the exact number of steps and records only how the count grows. A method that takes `n` steps and one that takes `2n` steps have the same shape: both are linear. The nested version has the shape `n²`, and that is what makes it slow for large inputs.

## Try it yourself

- Change both calls to use 1000. What are the counts?
- Add a third loop inside the inner one. Predict the count for `n = 10` before you run it.

## Quiz

```quiz
A loop runs once for each of n items. When n doubles, what happens to the number of steps?
○ It stays the same.
→ Not quite. The loop runs once for each item, so the work follows the item count.
◉ It doubles.
→ Right. A single pass over the items grows in step with them.
○ It quadruples.
→ Not quite. Quadrupling happens for two nested passes, not one.
```
