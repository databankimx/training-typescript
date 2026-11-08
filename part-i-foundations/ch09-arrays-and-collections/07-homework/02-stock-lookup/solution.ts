const stock: Map<string, number> = new Map([["apples", 3]]);

console.log(stock.get("pears") ?? 0);
