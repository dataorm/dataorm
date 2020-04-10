import { Store } from '../Database/Store';
import { Subject } from '../Observer/Subject';

class Mutation {
  private store = Store.instance;
  private subject = Subject.instance;

  public model: any;

  constructor(model: any) {
    this.model = model;
  }

  public create(object: any) {
    this.store.setState(object);

    this.subject.fire(this.store.state);
  }
}

export { Mutation };
