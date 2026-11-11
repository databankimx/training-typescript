function loadUser(id: number): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    setTimeout(() => {
      if (id === 0) {
        reject(new Error("No user with id 0"));
      } else {
        resolve(`user ${id}`);
      }
    }, 50);
  });
}

async function main(): Promise<void> {
  try {
    console.log(await loadUser(7));
    console.log(await loadUser(0));
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(`Failed: ${error.message}`);
    }
  }
}

void main();
