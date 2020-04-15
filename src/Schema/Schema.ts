import { schema as Normalizr } from 'normalizr';
import { Relations } from '../Attributes/Relations/Relations';

export class Schema {
  public model: any;
  public schemas: { [key: string]: any };

  constructor(model: any) {
    this.model = model;
    this.schemas = {};
  }

  public static create(model: any) {
    return new this(model).one();
  }

  public one(model?: any) {
    model = model || this.model;

    if (this.schemas[model.entity]) {
      return this.schemas[model.entity];
    }

    const schema = new Normalizr.Entity(model.entity, {}, {});

    this.schemas[model.entity] = schema;
    const definition = this.definition(model);

    schema.define(definition);
    return schema;
  }

  public many(model: any) {
    return new Normalizr.Array(this.one(model));
  }

  private definition(model: any) {
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
