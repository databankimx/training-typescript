const request: Request = new Request("https://example.com/orders", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ item: "mug", quantity: 2 }),
});

console.log(request.method);
console.log(request.url);
console.log(request.headers.get("Content-Type"));
