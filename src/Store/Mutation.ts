import { Database } from '../Database/DB';
import { Action } from '../Database/types';
import { OrmStore } from '../Database/OrmStore';

class Mutation {
  private db: Database = Database.getInstance();

  public setContext: (data: any) => any;

  constructor(setContext: () => any) {
    this.setContext = setContext;
  }

  collection(entity: string): any[] {
    return this.db.state[OrmStore.dbConfig.name][entity];
  }

  create({ payload }: Action) {
    const collection = this.collection(payload.model.entity);

    const maxId = Math.max(...collection.map(col => col.id));

    const nextId = collection.length ? maxId + 1 : 1;

    payload.data['id'] = payload.data['id'] ? payload.data['id'] : nextId;

    const entities = {
      [OrmStore.dbConfig.name]: {
        [payload.model.entity]: [...collection, payload.data],
      },
    };

    this.setContext(entities);

    this.db.fire(entities);
  }

  update({ payload }: Action) {
    const collection = this.collection(payload.model.entity);

    const newCollection = collection.map((col: any) => {
      const ids: any[] = payload.data.updatableRecords.map(
        (rec: any) => rec.id
      );

      return ids.includes(col.id)
        ? { ...col, ...payload.data.updatableData }
        : col;
    });

    const entities = {
      [OrmStore.dbConfig.name]: {
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
      [OrmStore.dbConfig.name]: {
        [payload.model.entity]: newCollection,
      },
    };

    this.setContext(entities);

    this.db.fire(entities);
  }
}

export { Mutation };
