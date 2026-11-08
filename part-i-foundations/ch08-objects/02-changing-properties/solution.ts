const customer: { name: string; city: string; age: number } = {
  name: "Ada",
  city: "Dallas",
  age: 36,
};

customer.city = "Austin";
customer.age = customer.age + 1;

console.log(`${customer.name} lives in ${customer.city}, age ${customer.age}`);
