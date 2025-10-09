//клонирование протипа
interface Prototype {
  clone(): Prototype;
}

class TestCase implements Prototype {
  public title: string;
  public severity: string;
  public isWeb: boolean;
  private environmentVersion: string;

  constructor(title: string, severity: string, isWeb: boolean) {
    this.title = title;
    this.severity = severity;
    this.isWeb = isWeb;
    this.environmentVersion = "0.1";
  }

  clone(): TestCase {
    return new TestCase(this.title, this.severity, this.isWeb);
  }

  show(): void {
    console.log(
      `${this.title}, ${this.severity}, ${this.isWeb}, ${this.environmentVersion}`
    );
  }
}

const emptyTest = new TestCase("Test 1", "High", false);
const Test1 = emptyTest.clone();
Test1.title = "Test1";
Test1.show();

const Test2 = emptyTest.clone();
Test2.title = "Test2";
Test2.isWeb = true;
Test2.show();
