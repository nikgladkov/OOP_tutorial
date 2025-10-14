interface TaxSource {
  returnTax(): number;
  print(indent?: number): void;
}

//leaf item
class TaxLine implements TaxSource {
  public readonly name: string;
  private readonly amount: number;

  constructor(name: string, amount: number) {
    this.name = name;
    this.amount = amount;
  }

  returnTax(): number {
    return this.amount;
  }

  print(indent: number = 0): void {
    const spaces = " ".repeat(indent);
    console.log(`${spaces}- ${this.name}: ${this.amount}`);
  }
}

//composite item
class TaxLinesGroup implements TaxSource {
  public readonly name: string;
  public readonly baseAmount: number;
  private readonly subTaxLinesArray: Map<number, TaxSource> = new Map();

  constructor(name: string, baseAmount: number) {
    this.name = name;
    this.baseAmount = baseAmount;
  }

  add(key: number, child: TaxSource): void {
    this.subTaxLinesArray.set(key, child);
  }

  remove(key: number): void {
    this.subTaxLinesArray.delete(key);
  }

  getChild(key: number): TaxSource | undefined {
    return this.subTaxLinesArray.get(key);
  }

  returnTax(): number {
    let total = this.baseAmount;

    for (const [id, child] of this.subTaxLinesArray) {
      const current = child.returnTax();
      total += current;
    }

    return total;
  }

  print(indent: number = 0): void {
    const spaces = " ".repeat(indent);
    console.log(`${spaces}+ ${this.name} (base: ${this.baseAmount})`);

    for (const [, child] of this.subTaxLinesArray) {
      child.print(indent + 2); // рекурсия с увеличением отступа
    }

    console.log(`${spaces}= subtotal: ${this.returnTax()}`);
  }
}

//
class TotalTax {
  private readonly taxSource: TaxSource;

  constructor(taxSource: TaxSource) {
    this.taxSource = taxSource;
  }

  get(): number {
    const total = this.taxSource.returnTax();
    console.log(`TOTAL TAX = ${total}`);
    return total;
  }

  printTree(): void {
    console.log("=== TAX TREE ===");
    this.taxSource.print();
    console.log("================");
  }
}

//client
//mock product
const productSize = 50;
const productWeight = 10;

//Tax tree:
// Total Tax
// - General Tax
// - Federal Tax
// - Shipping Tax
// -- Base
// -- State
// -- Handling
// -- Box
// --- pack fee
// --- post fee

const generalTax = new TaxLine("General tax", 5);
const federalTax = new TaxLine("Federal Tax", 5);

const shippingBase = new TaxLine("Base", 5);
const shippingState = new TaxLine("State", 5);
const ShippingHandling = new TaxLine("Handling", 5);

const shippingPackFee = new TaxLine("Pack Fee", 5);
const shippingPostFee = new TaxLine("Post Fee", 5);
const shippingBoxGroup = new TaxLinesGroup("Box", 5);
shippingBoxGroup.add(1, shippingPackFee);
shippingBoxGroup.add(2, shippingPostFee);

const shippingTaxGroup = new TaxLinesGroup("Shipping Tax", 5);
shippingTaxGroup.add(1, shippingBase);
shippingTaxGroup.add(2, shippingState);
shippingTaxGroup.add(3, ShippingHandling);
shippingTaxGroup.add(4, shippingBoxGroup);

const totalTaxGroup = new TaxLinesGroup("Total tax", 5);
totalTaxGroup.add(1, generalTax);
totalTaxGroup.add(2, federalTax);
totalTaxGroup.add(3, shippingTaxGroup);

const totalTax = new TotalTax(totalTaxGroup);

totalTax.printTree();
totalTax.get();
