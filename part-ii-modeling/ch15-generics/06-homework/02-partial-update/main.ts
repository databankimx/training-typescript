interface Order {
  id: number;
  status: string;
}

const order: Order = { id: 1, status: "new" };

console.log(order.status);
