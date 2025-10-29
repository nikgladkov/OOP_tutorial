import { Order, OrderState } from "./order";

export interface Handler {
  setNext(handler: Handler): Handler;
  handle(order: Order): Order;
}

export abstract class AbstractHandler implements Handler {
  nextHandler: Handler;
  setNext(handler: Handler): Handler {
    this.nextHandler = handler;
    return handler;
  }
  handle(order: Order): Order {
    if (this.nextHandler) {
      return this.nextHandler.handle(order);
    }
    return null;
  }
}

export class Canceller extends AbstractHandler {
  fraudScoreTreshHold: number;

  constructor(fraudScoreTresHold: number) {
    super();
    this.fraudScoreTreshHold = fraudScoreTresHold;
  }

  handle(order: Order): Order {
    if (order.fraudScore >= this.fraudScoreTreshHold) {
      const currentState = order.getState();
      if (currentState != OrderState.Shipped) {
        order.setState(OrderState.Cancelled);
        console.log(`${order.log()} (fraud score ${order.fraudScore})`);
      }
    }
    return super.handle(order);
  }
}

export class Newer extends AbstractHandler {
  handle(order: Order): Order {
    const currentState = order.getState();
    if (currentState == OrderState.Unprocessed) {
      order.setState(OrderState.New);
      console.log(`${order.log()}`);
    }
    return super.handle(order);
  }
}

export class Placer extends AbstractHandler {
  handle(order: Order): Order {
    const currentState = order.getState();
    if (currentState == OrderState.New) {
      order.setState(OrderState.Placed);
      console.log(`${order.log()}`);
    }
    return super.handle(order);
  }
}

export class Shipper extends AbstractHandler {
  handle(order: Order): Order {
    const currentState = order.getState();
    if (currentState == OrderState.Placed) {
      order.setState(OrderState.ReadyToShip);
      console.log(`${order.log()}`);
    }
    return super.handle(order);
  }
}

export class ShippingChecker extends AbstractHandler {
  handle(order: Order): Order {
    const currentState = order.getState();
    if (currentState == OrderState.ReadyToShip) {
      let currentShippingStatus = order.getShippingStatus();
      if (currentShippingStatus) {
        order.setState(OrderState.Shipped);
        console.log(
          `${order.log()} (is shipped)`
        );
      } else {
        console.log(
          `${order.log()} (not shipped yet)`
        );
      }
    }
    return super.handle(order);
  }
}
