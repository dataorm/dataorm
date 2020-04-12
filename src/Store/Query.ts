import { Store } from '../Database/Store';
import { lazyInject } from '../IoC/bindings';
import { TYPES } from '../IoC/types';

class Query {
  @lazyInject(TYPES.Store) private store!: Store;

  public model: any;

  public builder = {
    or: [],
    and: [],
    in: [],
  };

  public load = [];

  constructor(model: any) {
    this.model = model;
  }

  public all() {
    return this.store.state;
  }

  public where() {
    return new Query(this.model);
  }

  public with() {
    return new Query(this.model);
  }
}

export { Query };
