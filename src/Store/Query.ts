import { Store } from './Store';
import { container } from '../IoC/bindings';

class Query {
  private store: Store = container.get<Store>('Store');

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
