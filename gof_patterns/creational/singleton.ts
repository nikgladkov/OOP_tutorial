//Один объект класса и все
//Goal: Singleton object that creates and keeps a connection to the DB. UseCache - a flag that can be set.

class DbConnector {
  private _host: string;
  private _dbName: string;
  private _useCache: boolean;

  //###------Singleton--------###

  // 1. Stores the instance in the class ('instance' is the conventional name of the object).
  private static instance: DbConnector;

  // 2. Constructor prevents direct object creation.
  private constructor(host: string, dbName: string, useCache: boolean) {
    this._host = host;
    this._dbName = dbName;
    this._useCache = useCache;
  }

  // 3. Creates the singleton instance.
  public static init(
    host: string,
    dbName: string,
    useCache: boolean = false
  ): DbConnector {
    if (DbConnector.instance) {
      throw new Error("DbConnector is already initialized.");
    }
    DbConnector.instance = new DbConnector(host, dbName, useCache);
    return DbConnector.instance;
  }

  // 4. Returns the singleton instance.
  public static getInstance(): DbConnector {
    if (!DbConnector.instance) {
      throw new Error("DbConnector is not initialized. Call init() first.");
    }
    return DbConnector.instance;
  }
  //###------Singleton--------###

  public get host(): string {
    return this._host;
  }

  public get dbName(): string {
    return this._dbName;
  }

  public get useCache(): boolean {
    return this._useCache;
  }

  public set useCache(value: boolean) {
    this._useCache = value;
  }
}

//1. Try to get instance without init
//const dbConnection0 = DbConnector.getInstance(); //Error("DbConnector is not initialized. Call init() first.");

//2. Init
const dbConnection1 = DbConnector.init("127.0.0.1", "main", false);
console.log(dbConnection1); //DbConnector { _host: '127.0.0.1', _dbName: 'main', _useCache: false }

//3. Try to create another instance after init
//const dbConnection2 = DbConnector.init("127.0.0.1", "staging", true); //Error("DbConnector is already initialized.")

//4. Switch the cache value (setter no needs ()!)
dbConnection1.useCache = true;
console.log(dbConnection1); //DbConnector { _host: '127.0.0.1', _dbName: 'main', _useCache: true }
