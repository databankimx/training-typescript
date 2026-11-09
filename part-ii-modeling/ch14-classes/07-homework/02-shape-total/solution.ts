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

class Rectangle implements Shape {
  width: number;
  height: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  area(): number {
    return this.width * this.height;
  }
}

const shapes: Shape[] = [new Square(3), new Rectangle(2, 5)];

let total: number = 0;
for (const shape of shapes) {
  total = total + shape.area();
}

console.log(total);
