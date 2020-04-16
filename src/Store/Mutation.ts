import { injectable } from 'inversify';
import { container } from '../IoC/container';
import { TYPES } from '../IoC/types';
import { Database } from './Database';
import { normalize } from 'normalizr';

@injectable()
class Mutation {
  private database: Database = container.get(TYPES.Database);

  public model: any;

  constructor(model: any) {
    this.model = model;
  }

  public create(object: any) {
    const normalizerSchema = this.database.schema[this.model.entity];
    const normalizedData = normalize(object, normalizerSchema);

    console.log('normalizedData', normalizedData);
  }
}

export { Mutation };
