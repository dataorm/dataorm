import { injectable } from 'inversify';
import { container } from '../IoC/container';
import { TYPES } from '../IoC/types';
import { Store } from './Store';

@injectable()
class StoreConfig {
  private store: Store = container.get(TYPES.Store);

  public init() {
    this.store.init = true;

    return this.store;
  }
}

export { StoreConfig };
