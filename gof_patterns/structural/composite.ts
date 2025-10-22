//подсчет дерева tax

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
      child.print(indent + 2);
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

//Tax tree:
// Total Tax 0
// - General Tax 10
// - Federal Tax 7.99
// - Shipping Tax 0
// -- Base 0.99
// -- State 12
// -- Handling 2.99
// -- Box 0
// --- pack fee 5
// --- post fee 3

const generalTax = new TaxLine("General tax", 10);
const federalTax = new TaxLine("Federal Tax", 7.99);

const shippingBase = new TaxLine("Base", 0.99);
const shippingState = new TaxLine("State", 12);
const ShippingHandling = new TaxLine("Handling", 2.99);

const shippingPackFee = new TaxLine("Pack Fee", 5);
const shippingPostFee = new TaxLine("Post Fee", 3);
const shippingBoxGroup = new TaxLinesGroup("Box", 0);
shippingBoxGroup.add(1, shippingPackFee);
shippingBoxGroup.add(2, shippingPostFee);

const shippingTaxGroup = new TaxLinesGroup("Shipping Tax", 0);
shippingTaxGroup.add(1, shippingBase);
shippingTaxGroup.add(2, shippingState);
shippingTaxGroup.add(3, ShippingHandling);
shippingTaxGroup.add(4, shippingBoxGroup);

const totalTaxGroup = new TaxLinesGroup("Total tax", 0);
totalTaxGroup.add(1, generalTax);
totalTaxGroup.add(2, federalTax);
totalTaxGroup.add(3, shippingTaxGroup);

const totalTax = new TotalTax(totalTaxGroup);

totalTax.printTree();
totalTax.get();

// === TAX TREE ===
// + Total tax (base: 0)
//   - General tax: 10
//   - Federal Tax: 7.99
//   + Shipping Tax (base: 0)
//     - Base: 0.99
//     - State: 12
//     - Handling: 2.99
//     + Box (base: 0)
//       - Pack Fee: 5
//       - Post Fee: 3
//     = subtotal: 8
//   = subtotal: 23.98
// = subtotal: 41.97
// ================
// TOTAL TAX = 41.97