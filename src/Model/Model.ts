import { Mutation } from '../Store/Mutation';
import { Query } from '../Store/Query';

class Model {
  private static get query() {
    return new Query(this);
  }

  private static get mutation() {
    return new Mutation(this);
  }

  static get() {
    return this.query.get();
  }

  static create(object: any) {
    return this.mutation.create(object);
  }
}

export { Model };
