import { injectable } from 'inversify';
import { container } from '../IoC/container';
import { TYPES } from '../IoC/types';
import { Subject } from '../Observer/Subject';
import { Store } from './Store';

@injectable()
class Mutation {
  private store: Store = container.get(TYPES.Store);
  private subject: Subject = container.get(TYPES.Subject);

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
