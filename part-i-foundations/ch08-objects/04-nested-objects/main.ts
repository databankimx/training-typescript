const order: { id: number; buyer: { name: string; city: string } } = {
  id: 1042,
  buyer: { name: "Ada", city: "Dallas" },
};

console.log(order.buyer.city);
console.log(order.id);
