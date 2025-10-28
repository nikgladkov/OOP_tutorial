interface ParsingStrategy {
  parse(pageURL: string): void;
}

class ParseGuestCheckoutPage implements ParsingStrategy {
  parse(pageURL: string): void {
    console.log(`ParseGuestCheckoutPage: Parsing the Guest Checkout page...`);
  }
}

class ParseReturnCheckoutPage implements ParsingStrategy {
  parse(pageURL: string): void {
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

  public parsePage(pageURL: string): void {
    this.strategy.parse(pageURL);
  }
}

//client
const checkoutContext = new CheckoutContext(new ParseGuestCheckoutPage());

function parsePagebyURL(pageURL: string) {
  console.log(`\nPage: ${pageURL}`);
  if (pageURL.includes("guest-checkout")) {
    checkoutContext.setStrategy(new ParseGuestCheckoutPage());
  } else if (pageURL.includes("returning-user")) {
    checkoutContext.setStrategy(new ParseReturnCheckoutPage());
  } else {
    console.log(`parsePagebyURL: Can't parse the page`);
    return;
  }

  checkoutContext.parsePage(pageURL);
}

parsePagebyURL("https://www.site.com/guest-checkout/");
parsePagebyURL("https://www.site.com/returning-user/");
parsePagebyURL("https://www.site.com/about-us/");
