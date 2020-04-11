import { Store } from '../Database/Store';

class Query {
  private store = Store.instance;

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
