import { Store } from '../Database/Store';

class Query {
  private store = Store.instance;

  public model: any;

  constructor(model: any) {
    this.model = model;
  }

  public get() {
    return this.store.state;
  }
}

export { Query };
