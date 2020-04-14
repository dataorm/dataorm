import { injectable } from 'inversify';
import { TYPES } from '../IoC/types';
import { container } from '../IoC/container';
import { Store } from './Store';
import { QueryBuilder } from './QueryBuilder';

@injectable()
class Query {
  private store: Store = container.get(TYPES.Store);

  public model: any;

  constructor(model: any) {
    this.model = model;
  }

  public find() {
    return this.store.state;
  }

  public first() {
    //
  }

  public has() {
    //
  }

  public doesntHave() {
    //
  }

  public whereHas() {
    //
  }

  public whereDoesntHave() {
    //
  }

  public all() {
    return this.store.state;
  }

  public where() {
    return new QueryBuilder(this.model);
  }

  public with() {
    return new QueryBuilder(this.model);
  }
}

export { Query };
