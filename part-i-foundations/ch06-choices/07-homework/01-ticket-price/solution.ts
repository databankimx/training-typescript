const age: number = 30;

let price: number;
if (age < 12) {
  price = 6;
} else if (age < 65) {
  price = 12;
} else {
  price = 8;
}

console.log(price);
