import { Database } from '../Database/DB';
import { Action } from '../Database/types';
import { ModelNotFound } from '../Exceptions/ModelNotFound';

class Query {
  private db: Database = Database.getInstance();

  collection(entity: string) {
    return this.db.state[this.db.dbConfig.name][entity];
  }

  first({ payload }: Action) {
    const entities: any[] = this.collection(payload.model.entity);
    const first = entities.length ? entities[0] : null;

    return first;
  }

  firstOrFail({ type, payload }: Action) {
    const first = this.first({ type, payload });

    if (first) {
      return first;
    }

    throw new ModelNotFound('Oops! Record does not exists in database');
  }

  find({ payload }: Action) {
    const entities: any[] = this.collection(payload.model.entity);
    const find = entities.find(e => e.id === payload.data.id);
    const findById = find ? find : null;

    return findById;
  }

  get({ payload }: Action) {
    const entities: any[] = this.collection(payload.model.entity);

    return entities;
  }
}

export { Query };
