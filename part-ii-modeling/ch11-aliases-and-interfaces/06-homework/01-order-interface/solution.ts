interface Order {
  id: number;
  total: number;
  note?: string;
}

const order: Order = { id: 1042, total: 35, note: "gift wrap" };

console.log(`Order ${order.id}: ${order.total} (${order.note ?? "no note"})`);
