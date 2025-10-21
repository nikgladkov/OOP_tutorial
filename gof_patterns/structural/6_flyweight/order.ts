// Sending n test various orders based on the template OrderJSON with a static and heavy meta field

import { ShippingMethod, TaxRegion, OrderJSON } from "./types";
import { GetRandomNumber } from "./utils";

class OrderUniqueState {
  public readonly orderId: number;
  public readonly user: string;
  public readonly shippingMethodId: ShippingMethod;
  public readonly taxRegionId: TaxRegion;

  constructor() {
    this.orderId = GetRandomNumber(100);
    this.user = "test" + GetRandomNumber(100) + "@test.st";
    this.shippingMethodId = GetRandomNumber(4);
    this.taxRegionId = GetRandomNumber(3);
  }
}

class OrderSharedState {
  //flyweight
  public readonly heavyMeta: string = "some static data wrappers that can be cached";
  static instance: OrderSharedState | null = null;

  private constructor() {}

  static getInstance(): OrderSharedState {
    if (!this.instance) this.instance = new OrderSharedState();
    return this.instance;
  }
}

export class Order {
  private readonly orderUniqueState = new OrderUniqueState();
  private readonly orderSharedState = OrderSharedState.getInstance();

  toJSON(): OrderJSON {
    return {
      orderId: this.orderUniqueState.orderId,
      user: this.orderUniqueState.user,
      shippingMethodId: this.orderUniqueState.shippingMethodId,
      taxRegionId: this.orderUniqueState.taxRegionId,
      heavyMeta: this.orderSharedState.heavyMeta,
    };
  }
}
