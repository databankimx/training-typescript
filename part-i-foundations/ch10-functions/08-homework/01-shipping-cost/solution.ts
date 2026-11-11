function shippingCost(weight: number): number {
  if (weight < 2) {
    return 5;
  } else if (weight <= 10) {
    return 10;
  } else {
    return 20;
  }
}

console.log(shippingCost(4));
