import { schema as Normalizr } from 'normalizr';
import { Relations } from '../Attributes/Relations/Relations';
import { IdAttribute } from './IdAttribute';
import { Model } from '../Model/Model';

export class Schema {
  public model: typeof Model;
  public schemas: { [key: string]: any };

  constructor(model: typeof Model) {
    this.model = model;
    this.schemas = {};
  }

  public static create(model: typeof Model) {
    return new this(model).one();
  }

  public one(model?: typeof Model) {
    model = model || this.model;

    if (this.schemas[model.entity]) {
      return this.schemas[model.entity];
    }

    const schema = new Normalizr.Entity(
      model.entity,
      {},
      {
        idAttribute: IdAttribute.create(model),
      }
    );

    this.schemas[model.entity] = schema;
    const definition = this.definition(model);

    schema.define(definition);
    return schema;
  }

  public many(model: any) {
    return new Normalizr.Array(this.one(model));
  }

  private definition(model: typeof Model) {
    const fields = model.relations();

    return Object.keys(fields).reduce((carry: any, item: string) => {
      const field = fields[item];

      if (field instanceof Relations) {
        carry[item] = field.define(this);
      }

      return carry;
    }, {});
  }
}
