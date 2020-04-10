export type ObserverInterface = (data: any) => any;

class Subject {
  private static _instance: Subject = new Subject();

  protected observers: ObserverInterface[] = [];

  constructor() {
    if (Subject._instance) {
      throw new Error('Already initialized');
    }

    Subject._instance = this;
  }

  public static get instance(): Subject {
    return this._instance;
  }

  public subscribe(fn: ObserverInterface) {
    this.observers.push(fn);

    return () => this.unsubscribe(fn);
  }

  public fire(store: object) {
    this.observers.forEach((fn: ObserverInterface) => {
      fn(store);
    });
  }

  public unsubscribe(fnr: ObserverInterface) {
    this.observers = this.observers.filter(fn => fn !== fnr);
  }
}

export { Subject };
