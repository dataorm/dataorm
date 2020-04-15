import { Relations } from './Relations';

export class HasMany extends Relations {
  protected isNull = false;
  protected defaultValue: any;

  constructor(model: any) {
    super(model);
  }

  make(model: any, relation: any, key: any) {
    console.log(relation, key);

    return new HasMany(model);
  }

  define(schema: any) {
    return schema.many(this.model);
  }
}
