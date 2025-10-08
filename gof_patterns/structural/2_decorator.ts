interface IndexConnector {
  host: string;
  testConnection(): void;
  getIndices(): void;
}

class BasicIndexConnector implements IndexConnector {
  public readonly host: string;
  public readonly engine = "basic";

  constructor(host: string) {
    this.host = host;
  }

  testConnection(): void {
    console.log(`${this.host} - Testing Connection...`);
  }

  getIndices(): void {
    console.log(`${this.host} - Getting Indecies...`);
  }
}

/** Декоратор: добавляет авторизацию, оставаясь тем же интерфейсом */
class AuthConnectorDecorator implements IndexConnector {
  public readonly host: string;
  public readonly engine = "extended";
  public authCredentials: string;
  private innerIndexConnector: IndexConnector;

  constructor(authCredentials: string, innerIndexConnector: IndexConnector) {
    this.authCredentials = authCredentials;
    this.innerIndexConnector = innerIndexConnector;
    this.host = this.innerIndexConnector.host;
  }

  establishAuth(): void {
    console.log(
      `${this.host} - Establishing authorization for ${this.authCredentials}...`
    );
  }

  testConnection(): void {
    return this.innerIndexConnector.testConnection();
  }

  getIndices(): void {
    return this.innerIndexConnector.getIndices();
  }
}

//client
function elasticTest(elasticSearchConnector: BasicIndexConnector) {
  elasticSearchConnector.testConnection();
  elasticSearchConnector.getIndices();
}

function openSearchTest(openSearchConnector: AuthConnectorDecorator) {
  openSearchConnector.establishAuth();
  openSearchConnector.testConnection();
  openSearchConnector.getIndices();
}

const elasticSearchConnector = new BasicIndexConnector("127.0.0.1");
const openSearchConnector = new AuthConnectorDecorator("admin", elasticSearchConnector);

console.log(`${elasticSearchConnector.engine}`);
elasticTest(elasticSearchConnector);

console.log(`----\n`);

console.log(`${openSearchConnector.engine}`);
openSearchTest(openSearchConnector);
