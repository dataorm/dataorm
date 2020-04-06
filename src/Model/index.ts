import { Database } from '../Database/DB';

class Model {
  private static db: Database = Database.getInstance();

  static insert(object: any) {
    return this.db.getState({
      type: 'insert',
      payload: { model: this, data: object },
    });
  }

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

  static update(object: any) {
    return this.db.dispatch({
      type: 'update',
      payload: { model: this, data: object },
    });
  }

  static delete(id: any) {
    return this.db.dispatch({
      type: 'delete',
      payload: { model: this, data: { id } },
    });
  }
}

export { Model };
