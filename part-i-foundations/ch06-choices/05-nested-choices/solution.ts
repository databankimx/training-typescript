const hasTicket: boolean = true;
const age: number = 17;
const hasGuardian: boolean = true;

if (hasTicket) {
  if (age >= 18) {
    console.log("enter");
  } else if (hasGuardian) {
    console.log("enter with guardian");
  } else {
    console.log("not allowed");
  }
} else {
  console.log("buy a ticket");
}
