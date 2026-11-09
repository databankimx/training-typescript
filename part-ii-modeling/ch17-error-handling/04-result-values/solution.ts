type Result = { ok: true; value: number } | { ok: false; error: string };

function parseAge(text: string): Result {
  const age = Number(text);
  if (Number.isNaN(age) || age < 0) {
    return { ok: false, error: `"${text}" is not a valid age` };
  }
  return { ok: true, value: age };
}

const first = parseAge("42");
if (first.ok) {
  console.log(first.value * 2);
} else {
  console.log(first.error);
}

const second = parseAge("abc");
if (second.ok) {
  console.log(second.value * 2);
} else {
  console.log(second.error);
}
