const response: Response = new Response('{"name":"Ada","age":36}', {
  status: 200,
  headers: { "Content-Type": "application/json" },
});

console.log(response.status);
console.log(response.ok);

const data: unknown = await response.json();
console.log(data);
