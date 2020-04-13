import { Subject } from '../Observer/Subject';
import { Store } from './Store';
import { container } from '../IoC/bindings';

class Mutation {
  private store: Store = container.get<Store>('Store');

  private subject: Subject = new Subject();

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
