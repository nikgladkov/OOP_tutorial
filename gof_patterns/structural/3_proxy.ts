//Слой прокси

interface PaymentMaker {
  startPayment(paymentData: string): void;
  getActiveTransactions(): Map<number, string>;
}

class DefaultPaymentMaker implements PaymentMaker {
  public paymentData: string;
  private activeTransactionList: Map<number, string> = new Map();
  private transactionId: number = 1;

  constructor() {}

  startPayment(paymentData: string): void {
    this.activeTransactionList.set(this.transactionId, paymentData);
    this.transactionId++;
  }

  getActiveTransactions(): Map<number, string> {
    return this.activeTransactionList;
  }
}

class ProxyPaymentMaker implements PaymentMaker {
  private paymentMaker: PaymentMaker;
  private needReset: boolean = false;
  public limit: number;
  private activeTransactionListCache: Map<number, string> = new Map();

  constructor(paymentMaker: PaymentMaker, limit: number) {
    this.paymentMaker = paymentMaker;
    this.limit = limit;
  }

  startPayment(paymentData: string): void {
    if (this.paymentMaker.getActiveTransactions().size < this.limit) {
      this.paymentMaker.startPayment(paymentData);
      this.needReset = true;
    } else {
      console.log(`Quota for transaction is reached the limit ${this.limit}`);
    }
  }

  resetCache(): void {
    this.needReset = true;
  }

  getActiveTransactions(): Map<number, string> {
    if (this.needReset) {
      console.log(`Cache is reset...`);
      this.activeTransactionListCache =
        this.paymentMaker.getActiveTransactions();
      this.needReset = false;
    } else {
      console.log("Cache is not reset...");
    }
    return new Map (this.activeTransactionListCache);
  }
}

//client
//test data
const cards = ["card1", "card2", "card3", "card4"];

const pay1 = new DefaultPaymentMaker();
const proxyPay1 = new ProxyPaymentMaker(pay1, 3);

//Start Payments
for (const card of cards) {
  proxyPay1.startPayment(card);
}
//log:
//Quota for transaction is reached the limit 3

//GetPayments
for (let i = 0; i <= 3; i++) {
  if (i == 2) {
    proxyPay1.resetCache();
  }

  for (const [id, val] of proxyPay1.getActiveTransactions())
    console.log(id, val);
}
//log:
// Cache is reset...
// 1 card1
// 2 card2
// 3 card3
// Cache is not reset...
// 1 card1
// 2 card2
// 3 card3
// Cache is reset...
// 1 card1
// 2 card2
// 3 card3
// Cache is not reset...
// 1 card1
// 2 card2
// 3 card3
