import { Attributes } from '../Attributes/Attributes';
import { Database } from '../Database/DB';
import { Relations } from '../Relations/Relations';
import { Collection } from './Collection';

class Model {
  private static db: Database = Database.getInstance();

  protected static entity: string = '';

  protected static primaryKey: string = 'id';

  protected static get attributes() {
    return new Attributes(this);
  }

  protected static get relations() {
    return new Relations(this);
  }

  static query() {
    return this.db.getState({
      type: 'query',
      payload: { model: this },
    });
  }

  public static insert(object: any) {
    return this.db.getState({
      type: 'insert',
      payload: { model: this, data: object },
    });
  }

  public static all(): Collection {
    return this.db.getState({
      type: 'all',
      payload: { model: this },
    });
  }

  public static find(id: any) {
    return this.db.getState({
      type: 'find',
      payload: { model: this, data: id },
    });
  }

  public static first() {
    return this.db.getState({
      type: 'first',
      payload: { model: this },
    });
  }

  public static firstOrFail() {
    return this.db.getState({
      type: 'firstOrFail',
      payload: { model: this },
    });
  }

  public static update(object: any) {
    new Attributes(this).validate(object);

    return this.db.dispatch({
      type: 'update',
      payload: { model: this, data: object },
    });
  }

  public static create(object: any) {
    new Attributes(this).validate(object);

    return this.db.dispatch({
      type: 'create',
      payload: { model: this, data: object },
    });
  }

  public static delete(id: any) {
    return this.db.dispatch({
      type: 'delete',
      payload: { model: this, data: { id } },
    });
  }
}

export { Model };
