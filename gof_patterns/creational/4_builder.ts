//Конструктор объектов из готовых деталей
interface Builder {
  createHead(): void;
  createFangs(): void;
  createTorso(): void;
  createHands(): void;
  createWings(): void;
  createLegs(): void;
  createTail(): void;
}

class Creature {
  public parts: string[] = [];
  public describeParts(): void {
    console.log(`behold these ${this.parts.join(", ")}\n`);
  }
}

class CreatureBuilder implements Builder {
  //empty creature to construct
  private creature: Creature;

  public reset(): void {
    this.creature = new Creature();
  }

  constructor() {
    this.reset();
  }

  //construction the creature
  public createHead(): void {
    this.creature.parts.push("Bird head");
  }
  public createFangs(): void {
    this.creature.parts.push("Nine inch fangs");
  }
  public createTorso(): void {
    this.creature.parts.push("Ugly insect body");
  }
  public createHands(): void {
    this.creature.parts.push("Heavy tattooed male hands");
  }
  public createWings(): void {
    this.creature.parts.push("Wings on the sides");
  }
  public createLegs(): void {
    this.creature.parts.push("Eight spider legs");
  }
  public createTail(): void {
    this.creature.parts.push("Furry long tail");
  }

  //returning the creature then reset for new one
  public getCreature(): Creature {
    const result = this.creature;
    this.reset();
    return result;
  }
}

class Director {
  private builder: Builder;

  public setBuilder(builder: Builder): void {
    this.builder = builder;
  }

  public buildFlyingHeads(): void {
    this.builder.createHead();
    this.builder.createWings();
  }

  public buildHandyLegs(): void {
    this.builder.createHead();
    this.builder.createLegs();
    this.builder.createTail();
  }

  public buildSpiders(): void {
    this.builder.createTorso();
    this.builder.createLegs();
  }
}

//-----client
function buildAndDescribeCreature(director: Director) {
  const builder = new CreatureBuilder();
  director.setBuilder(builder);

  console.log("Prepare to battle with creature no 1:\n");
  director.buildFlyingHeads();
  builder.getCreature().describeParts();

  console.log("Prepare to battle with creature no 2:\n");
  director.buildSpiders();
  builder.getCreature().describeParts();

  console.log("Prepare to battle with creature no 3:\n");
  builder.createHead();
  builder.createFangs();
  builder.createLegs();
  builder.getCreature().describeParts();
}

const director = new Director();

console.log("Here it comes...:\n");
buildAndDescribeCreature(director);
