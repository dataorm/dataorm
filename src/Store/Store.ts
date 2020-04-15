import { injectable } from 'inversify';
import { container } from '../IoC/container';
import { TYPES } from '../IoC/types';
import { ObserverInterface, Subject } from '../Observer/Subject';

@injectable()
class Store {
  private subject: Subject = container.get(TYPES.Subject);

  private _state: any = {};

  public get state() {
    return this._state;
  }

  public setState: (data: any) => any = (data: any) => {
    this._state = data;
  };

  public subscribe(fn: ObserverInterface) {
    return this.subject.subscribe(fn);
  }
}

export { Store };
