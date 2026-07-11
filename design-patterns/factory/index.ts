// Product interface
interface Shape {
  draw(): void;
}

// Concrete Products
class Circle implements Shape {
  draw(): void {
    console.log("⚪ Drawing a Circle");
  }
}

class Square implements Shape {
  draw(): void {
    console.log("⬛ Drawing a Square");
  }
}

class Triangle implements Shape {
  draw(): void {
    console.log("🔺 Drawing a Triangle");
  }
}

// Factory
class ShapeFactory {
  static createShape(type: "circle" | "square" | "triangle"): Shape {
    switch (type) {
      case "circle":
        return new Circle();
      case "square":
        return new Square();
      case "triangle":
        return new Triangle();
      default:
        throw new Error("Unknown shape type: " + type);
    }
  }
}

// Usage Example
const circle = ShapeFactory.createShape("circle");
circle.draw();

const square = ShapeFactory.createShape("square");
square.draw();

const triangle = ShapeFactory.createShape("triangle");
triangle.draw();
