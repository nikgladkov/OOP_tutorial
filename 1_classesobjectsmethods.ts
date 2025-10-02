//Классы. Объекты. Свойства. Методы. Конструктор.

class Rectangle {
  width: any;
  height: any;

  //special method
  constructor(w: number, h: number) {
    this.width = w;
    this.height = h;
  }

  //method
  calcPerimeter() {
    return (this.width + this.height) * 2;
  }
}

//Object
let rectangle = new Rectangle(5,10);

console.log(`${rectangle.width}, ${rectangle.height}, Perimeter: ${rectangle.calcPerimeter()}`);