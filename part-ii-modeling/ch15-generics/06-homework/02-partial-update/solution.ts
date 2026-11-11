interface Order {
  id: number;
  status: string;
}

function applyUpdate(order: Order, changes: Partial<Order>): Order {
  return { ...order, ...changes };
}

const order: Order = { id: 1, status: "new" };

console.log(applyUpdate(order, { status: "shipped" }).status);
