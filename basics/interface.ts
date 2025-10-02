//Интерфейс = создание нового типа
interface Plant {
  color: string;
  grow(): void;
}

class Veresk implements Plant {
  color: string;

  constructor(color: string) {
    this.color = color;
  }

  grow(): void {
    console.log(`${this.color} veresk grows`);
  }
}

class Lavanda implements Plant {
  color: string;
  constructor(color: string) {
    this.color = color;
  }
  grow(): void {
    console.log(`${this.color} lavanda grows`);
  }
}

const veresk = new Veresk("magenta")
veresk.grow()

const lavanda = new Lavanda("purple")
lavanda.grow()