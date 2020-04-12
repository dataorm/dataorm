import { Subject, ObserverInterface } from '../Observer/Subject';
import { StoreConfigOptions } from './types';
import { injectable } from 'inversify';

@injectable()
class Store {
  private subject = Subject.instance;

  public config: StoreConfigOptions = {
    name: 'db',
    sync: null,
  };

  private _state: any = {};

  public get state() {
    return this._state;
  }

  public init: any = false;

  public models: any[] = [];

  public setState: (data: any) => any = (data: any) => {
    this._state = data;
  };

  public subscribe(fn: ObserverInterface) {
    return this.subject.subscribe(fn);
  }
}

export { Store };
