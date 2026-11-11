type Status = "open" | "closed" | "pending";

function label(status: Status): string {
  switch (status) {
    case "open":
      return "Accepting orders";
    case "closed":
      return "Closed for the day";
    case "pending":
      return "Awaiting approval";
  }
}

console.log(label("open"));
console.log(label("pending"));
