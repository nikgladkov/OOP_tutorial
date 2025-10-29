import { Canceller, Newer, Placer, Shipper, ShippingChecker } from "./handlers";
import { orderCreation, orderProcessing } from "./utils";

const fraudScoreTreshold = 30;

orderCreation();

const cancellerHandler = new Canceller(fraudScoreTreshold);
const newer = new Newer();
const placer = new Placer();
const shipper = new Shipper();
const shippingChecker = new ShippingChecker();


cancellerHandler.setNext(newer).setNext(placer).setNext(shipper).setNext(shippingChecker)

let currentOrders = orderCreation();

console.log(`\nTest orders:\n (fraudScoreTreshold is ${fraudScoreTreshold})\n`);
console.log(currentOrders);

orderProcessing(cancellerHandler, currentOrders);
console.log(currentOrders);
