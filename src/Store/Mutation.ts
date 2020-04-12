import { Store } from '../Database/Store';
import { container } from '../IoC/bindings';
import { TYPES } from '../IoC/types';
import { Subject } from '../Observer/Subject';

class Mutation {
  private store: Store = container.get(TYPES.Store);

  private subject = Subject.instance;

  public model: any;

  constructor(model: any) {
    this.model = model;
  }

  public create(object: any) {
    const immutableStore = Object.assign(this.store.state);

    const collection =
      immutableStore[this.store.config.name][this.model.entity];

    collection.push(object);

    this.store.setState(immutableStore);

    this.subject.fire(immutableStore);
  }
}

export { Mutation };
