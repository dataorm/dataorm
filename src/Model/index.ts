import { Database } from '../Database/DB';

class Model {
  private static db: Database = Database.getInstance();

  private static getCollection() {
    const { state, dbConfig, models } = this.db;
    const { name } = dbConfig;

    const model = models.find((m: any) => m.model.name === this.name);

    return state[name][model.entity];
  }

  private static setCollection(collection: any) {
    const { state, dbConfig, models } = this.db;
    const { name } = dbConfig;

    const model = models.find((m: any) => m.model.name === this.name);

    state[name][model.entity] = collection;

    return state;
  }

  static get() {
    return this.getCollection();
  }

  static create(object: object) {
    const current_collection = this.getCollection() ? this.getCollection() : [];
    const new_collection = [...current_collection, object];
    const state = this.setCollection(new_collection);

    return this.db.dispatch(state);
  }
}

export { Model };
