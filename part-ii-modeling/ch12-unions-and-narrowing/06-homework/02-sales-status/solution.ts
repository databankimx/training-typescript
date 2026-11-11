type TicketStatus = "open" | "soldOut";

function ticketMessage(status: TicketStatus): string {
  switch (status) {
    case "open":
      return "Sell tickets";
    case "soldOut":
      return "Sold out";
  }
}

console.log(ticketMessage("open"));
