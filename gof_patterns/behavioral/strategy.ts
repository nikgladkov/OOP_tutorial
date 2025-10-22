interface ParsingStrategy {
  parse(pageSource: string): void;
}

class ParseGuestCheckoutPage implements ParsingStrategy {
  parse(pageSource: string): void {
    console.log(`ParseGuestCheckoutPage: Parsing the Guest Checkout page...`);
  }
}

class ParseReturnCheckoutPage implements ParsingStrategy {
  parse(pageSource: string): void {
    console.log(
      `ParseReturnCheckoutPage: Parsing the Returning User Checkout page...`
    );
  }
}

class CheckoutContext {
  private strategy: ParsingStrategy;

  constructor(strategy: ParsingStrategy) {
    this.strategy = strategy;
  }

  public setStrategy(strategy: ParsingStrategy): void {
    this.strategy = strategy;
  }

  public parsePage(pageSource: string): void {
    console.log(`CheckoutContext: Getting the page to parse...`);
    this.strategy.parse(pageSource);
  }
}

//client
const checkoutContext = new CheckoutContext(new ParseGuestCheckoutPage());
checkoutContext.parsePage("<guest checkout code>");

checkoutContext.setStrategy(new ParseReturnCheckoutPage());
checkoutContext.parsePage("<returning checkout code>");