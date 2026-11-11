type Result = { ok: true; value: number } | { ok: false; error: string };

function parsePrice(text: string): Result {
  const price = Number(text);
  if (Number.isNaN(price)) {
    return { ok: false, error: `"${text}" is not a price` };
  }
  return { ok: true, value: price };
}

const result = parsePrice("12.50");
if (result.ok) {
  console.log(`Price: ${result.value}`);
} else {
  console.log(result.error);
}
