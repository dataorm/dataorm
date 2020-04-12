import { Store } from '../Database/Store';
import { container } from '../IoC/bindings';
import { TYPES } from '../IoC/types';

class Query {
  private store: Store = container.get(TYPES.Store);

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
