import { Database } from '../Database/DB';

class Model {
  private static db: Database = Database.getInstance();

  static get() {
    return this.db.getState({
      type: 'get',
      payload: { model: this },
    });
  }

  static find(id: any) {
    return this.db.getState({
      type: 'find',
      payload: { model: this, data: id },
    });
  }

  static first() {
    return this.db.getState({
      type: 'first',
      payload: { model: this },
    });
  }

  static create(object: any) {
    return this.db.dispatch({
      type: 'create',
      payload: { model: this, data: object },
    });
  }
}

export { Model };
