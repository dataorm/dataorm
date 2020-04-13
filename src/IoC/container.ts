export class IocContainer {
  private _dependencies: { [key: string]: Object } = {};

  private static _instance: IocContainer = new IocContainer();

  public static get instance(): IocContainer {
    return this._instance;
  }

  private constructor() {
    if (IocContainer._instance) {
      throw new Error('Already Initialized');
    }

    IocContainer._instance = this;
  }

  singleton(name: string, implementation: any, dependencies: string[]) {
    if (this._dependencies[name]) {
      throw new Error('Dependency already registered');
    }

    console.log(dependencies, implementation);

    // let depImplementations = this.getDependenciesImplementations(dependencies);

    this._dependencies[name] = new implementation();
  }

  resolve(name: string): any {
    if (!this._dependencies[name]) {
      throw new Error(`unresolved dependency ${name}`);
    }

    return this._dependencies[name];
  }

  run() {
    console.log(this, 'hello');
  }

  // private getDependenciesImplementations(names: string[]): Object[] {
  //   return names.map(name => this.resolve(name));
  // }
}
