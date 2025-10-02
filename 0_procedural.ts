//0. Procedural programming

const width: number = 5;
const height: number = 10;

function calcPerimeter(width: number, height: number): number {
  return (width + height) * 2;
}

console.log(`${width}, ${height}, Perimeter: ${calcPerimeter(width, height)}`);
