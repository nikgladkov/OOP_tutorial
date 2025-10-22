//Фабрика создает семейства объектов

interface EngineStarter {
  start(): void;
}

interface FuelChecker {
  check(): void;
}

class ElectricDriveStarter implements EngineStarter {
  start() {
    console.log("Sparks... starting the electric drive");
  }
}

class ElectricBatteryChecker implements FuelChecker {
  check() {
    console.log("Checking the battery voltage");
  }
}

class CombustionDriveStarter implements EngineStarter {
  start() {
    console.log("ignition... starting the combustion drive");
  }
}

class FuelTankChecker implements FuelChecker {
  check() {
    console.log("Checking the fuel level");
  }
}

//abstract factory
interface DoersFactory {
  createEngineStarter(): EngineStarter;
  createFuelChecker(): FuelChecker;
}

//factories
class ElectricDoersFactory implements DoersFactory {
  createEngineStarter(): EngineStarter {
    return new ElectricDriveStarter();
  }
  createFuelChecker(): FuelChecker {
    return new ElectricBatteryChecker();
  }
}

class CombustionDoersFactory implements DoersFactory {
  createEngineStarter(): EngineStarter {
    return new CombustionDriveStarter();
  }
  createFuelChecker(): FuelChecker {
    return new FuelTankChecker();
  }
}

//client
function app(factory: DoersFactory) {
  const engineStarter = factory.createEngineStarter();
  const fuelChecker = factory.createFuelChecker();

  engineStarter.start();
  fuelChecker.check();
}

app(new ElectricDoersFactory());
//Sparks... starting the electric drive
//Checking the battery voltage

app(new CombustionDoersFactory());
//ignition... starting the combustion drive
//Checking the fuel level
