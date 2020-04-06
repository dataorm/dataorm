import { Database } from '../Database/DB';
import { Action } from '../Database/types';

class Mutation {
  private db: Database = Database.getInstance();

  public setContext: (data: any) => any;

  constructor(setContext: () => any) {
    this.setContext = setContext;
  }

  collection(entity: string): any[] {
    return this.db.state[this.db.dbConfig.name][entity];
  }

  create({ payload }: Action) {
    const collection = this.collection(payload.model.entity);

    payload.data['id'] = payload.data['id']
      ? payload.data['id']
      : collection.length + 1;

    const entities = {
      [this.db.dbConfig.name]: {
        [payload.model.entity]: [...collection, payload.data],
      },
    };

    this.setContext(entities);

    this.db.fire(entities);
  }

  update({ payload }: Action) {
    const collection = this.collection(payload.model.entity);

    const newCollection = collection.map((c: any) => {
      return c.id === payload.data.id ? payload.data : c;
    });

    const entities = {
      [this.db.dbConfig.name]: {
        [payload.model.entity]: newCollection,
      },
    };

    this.setContext(entities);

    this.db.fire(entities);
  }

  delete({ payload }: Action) {
    const collection = this.collection(payload.model.entity);

    const newCollection = collection.filter(
      (c: any) => c.id !== payload.data.id
    );

    const entities = {
      [this.db.dbConfig.name]: {
        [payload.model.entity]: newCollection,
      },
    };

    this.setContext(entities);

    this.db.fire(entities);
  }
}

export { Mutation };
