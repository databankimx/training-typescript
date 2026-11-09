interface Order {
  id: number;
  total: number;
}

function isOrder(value: unknown): value is Order {
  return (
    typeof value === "object" &&
    value !== null &&
    "id" in value &&
    typeof value.id === "number" &&
    "total" in value &&
    typeof value.total === "number"
  );
}

const data: unknown = JSON.parse('{"id":7,"total":35}');
if (isOrder(data)) {
  console.log(`Order ${data.id}: ${data.total}`);
} else {
  console.log("invalid order");
}
