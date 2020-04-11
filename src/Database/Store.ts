import { Subject, ObserverInterface } from '../Observer/Subject';
import { StoreConfigOptions } from './types';

class Store {
  private static _instance: Store = new Store();

  private subject = Subject.instance;

  public config: StoreConfigOptions = {
    name: 'db',
    sync: null,
  };

  public state: any = {};

  public init: any = false;

  public models: any[] = [];

  public setState: any;

  private constructor() {
    if (Store._instance) {
      throw new Error('Already initialized');
    }

    Store._instance = this;
  }

  public subscribe(fn: ObserverInterface) {
    return this.subject.subscribe(fn);
  }

  public static get instance(): Store {
    return this._instance;
  }
}

export { Store };
