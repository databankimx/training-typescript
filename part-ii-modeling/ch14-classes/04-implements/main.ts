interface Shape {
  area(): number;
}

class Square implements Shape {
  side: number;

  constructor(side: number) {
    this.side = side;
  }

  area(): number {
    return this.side * this.side;
  }
}

const shapes: Shape[] = [new Square(3), new Square(4)];

for (const shape of shapes) {
  console.log(shape.area());
}
