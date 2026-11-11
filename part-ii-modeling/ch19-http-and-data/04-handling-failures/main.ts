async function readOrder(response: Response): Promise<string> {
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  const data: unknown = await response.json();
  return JSON.stringify(data);
}

async function main(): Promise<void> {
  try {
    console.log(await readOrder(new Response('{"id":7}', { status: 200 })));
    console.log(await readOrder(new Response("Not found", { status: 404 })));
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
}

void main();
