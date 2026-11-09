interface Customer {
  name: string;
  city: string;
}

interface VipCustomer extends Customer {
  points: number;
}

const vip: VipCustomer = { name: "Ada", city: "Dallas", points: 500 };

console.log(`${vip.name} has ${vip.points} points`);
