import { Order } from "./order";
import { Handler } from "./handlers";

export function orderCreation(): Order[] {
  const orders: Order[] = [];
  let curorder: Order;
  for (let i = 0; i < 10; i++) {
    orders.push(new Order());
  }
  return orders;
}

export function orderProcessing(handler: Handler, orders: Order[]) {
  for (const order of orders) {
    handler.handle(order);
  }
}
