export enum OrderState {
  Unprocessed = "Unprocessed",
  New = "New",
  Placed = "Placed",
  ReadyToShip = "Ready to Ship",
  Shipped = "Shipped",
  Cancelled = "Cancelled",
}

export class Order {
  private state: OrderState;
  public readonly orderNumber: number;
  public readonly fraudScore: number;

  constructor() {
    this.state = OrderState.Unprocessed;
    this.orderNumber = Math.floor(Math.random() * 10000);
    this.fraudScore = Math.floor(Math.random() * 100) + 1;
  }

  setState(state: OrderState): void {
    this.state = state;
  }

  getState(): OrderState {
    return this.state;
  }

  getShippingStatus(): boolean {
    return Math.random() < 0.5;
  }

  log(): string {
    return ` - ${this.orderNumber} - ${this.getState()}`;
  }
}
