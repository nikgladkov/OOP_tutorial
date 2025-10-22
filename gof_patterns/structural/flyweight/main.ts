import { Order } from "./order";

function createOrders(count: number): Order[] {
  for (let i = 0; i < count; i++) {
    ordersArray[i] = new Order();
  }
  return ordersArray;
}

let ordersArray: Order[] = [];
createOrders(10);

console.log(`\n=Orders in the array: ${ordersArray.length}=`);
for (const order of ordersArray) {
  console.log(`\n-order n ${ordersArray.indexOf(order) + 1}-`);
  console.log(order);
}