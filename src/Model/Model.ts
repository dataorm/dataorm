import { container } from '../IoC/container';
import { TYPES } from '../IoC/types';
import { Store } from '../Store/Store';

class Model {
  private static store: Store = container.get(TYPES.Store);

  public static all() {
    console.log(this.store.state, 'store');
  }
}

export { Model };
