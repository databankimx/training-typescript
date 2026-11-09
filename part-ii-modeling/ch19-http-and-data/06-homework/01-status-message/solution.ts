function describe(response: Response): string {
  if (response.ok) {
    return "OK";
  }
  return `Failed: ${response.status}`;
}

console.log(describe(new Response("", { status: 404 })));
