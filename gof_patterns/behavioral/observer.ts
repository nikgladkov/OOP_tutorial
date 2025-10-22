class OrderStateEventManager {
  private readonly observers: Observer<OrderEvent>[] = [];

  public subscribe(observer: Observer<OrderEvent>) {
    const isExist = this.observers.includes(observer);
    if (isExist) {
      console.log(
        "OrderStateEventManager: Observer has been attached already."
      );
    } else {
      console.log("OrderStateEventManager: Attached an observer.");
      this.observers.push(observer);
    }
  }
  public unsubscribe(observer: Observer<OrderEvent>) {
    const observerIndex = this.observers.indexOf(observer);
    if (observerIndex === -1) {
      return console.log("OrderStateEventManager: Nonexistent observer.");
    }

    this.observers.splice(observerIndex, 1);
    console.log("OrderStateEventManager: Detached an observer.");
  }
  public notify(data:{orderId: number, orderState: number}) {
    console.log(`OrderStateEventManager: Notify...`);
    for (const observer of this.observers) {
      observer.update(data);
    }
  }
}

interface Observer<T> {
  update(data: T): void;
}

type OrderEvent = { orderId: number; orderState: number };

class OrderStateCanceller implements Observer<OrderEvent> {
  public update(data: OrderEvent): void {
    console.log(
      `ChangeOrderState: Got order ${data.orderId} with state ${data.orderState}...`
    );
  }
}

class DbTestRunner implements Observer<OrderEvent> {
  public update(data: OrderEvent): void {
    console.log(
      `DbTestRunner: Got order ${data.orderId} with state ${data.orderState}...`
    );
  }
}

class OrderChecker {
  events: OrderStateEventManager;

  constructor(events: OrderStateEventManager) {
    this.events = events;
  }

  checkOrderStatus(orderId: number): void {
    const orderState = Math.floor(Math.random() * 2);
    if (orderState == 1) {
      console.log(
        `OrderChecker: order ${orderId} is finished (${orderState}).`
      );
      this.events.notify({orderId, orderState});
    } else {
      console.log(
        `OrderChecker: order ${orderId} is in processing (${orderState}).`
      );
    }
  }
}

//client
const orderStateEventManager = new OrderStateEventManager();
const orderStateCanceller = new OrderStateCanceller();
const dbTestRunner = new DbTestRunner();

orderStateEventManager.subscribe(orderStateCanceller);
orderStateEventManager.subscribe(dbTestRunner);

const orderChecker = new OrderChecker(orderStateEventManager);
orderChecker.checkOrderStatus(1501);

// OrderStateEventManager: Attached an observer.
// OrderStateEventManager: Attached an observer.
// OrderChecker: order 1501 is finished (1).
// OrderStateEventManager: Notify...
// ChangeOrderState: Got order 1501 with state 1...
// DbTestRunner: Got order 1501 with state 1...
