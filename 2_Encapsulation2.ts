class User {
  private username;
  private password;
  private _id;

  constructor({ username, password }: UserProps) {
    this.username = username;
    this.password = password;
    this._id = this.generateRandomId();
  }

  generateRandomId() {
    return Math.random();
  }

  // username
  public get Username(): string {
    return this.username;
  }

  public set Username(value: string) {
    this.username = value;
  }

  // password
  public get Password(): string {
    return this.password;
  }

  public set Password(value: string) {
    this.password = value;
  }

  // id
  //Гарантируем что имя и пароль могут меняться а id не может быть изменен
  public get Id(): number {
    return this._id;
  }
}

const user = new User(username:"1", password:"2");
