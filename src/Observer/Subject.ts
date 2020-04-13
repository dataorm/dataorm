import { injectable } from 'inversify';

export type ObserverInterface = (data: any) => any;

@injectable()
class Subject {
  protected observers: ObserverInterface[] = [];

  public subscribe(fn: ObserverInterface) {
    const exists = this.observers.find(sub => sub === fn);

    if (exists) throw new Error('Already Subscribed');

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
