interface Transport {
  //шаблон для всех объектов Transport
  drive(): void;
}

class Car implements Transport {
  drive() {
    //реализация метода
    console.log("Drive a brand new Car");
  }
}

class Bike implements Transport {
  drive() {
    console.log("Drive a brand new Bike");
  }
}

abstract class TransportFactory {
  //абстрактный класс с фабричным методом
  abstract createTransport(): Transport;

  //методы бизнес логики которые будут использованы объектами фабрики
  goSomewhere() {
    //нужно ехать → появляется нужный объект.
    const transport = this.createTransport();
    transport.drive();
  }
}

//фабрики
class CarFactory extends TransportFactory {
  createTransport(): Transport {
    return new Car();
  }
}

class BikeFactory extends TransportFactory {
  createTransport(): Transport {
    return new Bike();
  }
}

//Поехали → нужно ехать → появляется нужный объект
const carFactory = new CarFactory();
carFactory.goSomewhere();

const bikeFactory = new BikeFactory();
bikeFactory.goSomewhere();