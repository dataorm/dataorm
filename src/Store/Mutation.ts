import { injectable } from 'inversify';
import { container } from '../IoC/container';
import { TYPES } from '../IoC/types';
import { Database } from './Database';
import { normalize } from 'normalizr';
import { Model } from '../Model/Model';

@injectable()
class Mutation {
  private database: Database = container.get(TYPES.Database);

  public model: typeof Model;

  constructor(model: any) {
    this.model = model;
  }

  public create(object: any) {
    const normalizerSchema = this.database.schema[this.model.entity];

    const schema =
      object instanceof Array ? [normalizerSchema] : normalizerSchema;

    const normalizedData = normalize(object, schema);

    console.log(normalizedData, 'normalizedData');

    const entities = Object.entries(normalizedData.entities).reduce(
      (collections: any, [entity, record]: any) => {
        const model = this.database.model(entity);

        const collection = Object.entries(record).reduce(
          (data: any, [entity, record]: any) => {
            data[entity] = model.prepare(record);

            return data;
          },
          {}
        );

        collections[entity] = collection;

        collections['testing'] = {};

        return collections;
      },
      {}
    );

    this.database.store.setState({ hello: entities });
    console.log('entities', entities);
  }
}

export { Mutation };
