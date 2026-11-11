function idOf<T extends { id: number }>(item: T): number {
  return item.id;
}

console.log(idOf({ id: 7, name: "Ada" }));
