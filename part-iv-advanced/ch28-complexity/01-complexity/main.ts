// One loop over n items does n steps. Two loops, one inside the other, do n steps for each of the n outer steps.
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
