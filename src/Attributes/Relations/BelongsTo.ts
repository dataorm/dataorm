import { Relations } from './Relations';

export class BelongsTo extends Relations {
  protected isNull = false;
  protected defaultValue: any;

  constructor(model: any) {
    super(model);
  }

  make(model: any, relation: any, key: any) {
    console.log(relation, key);

    return new BelongsTo(model);
  }

  define(schema: any) {
    return schema.one(this.model);
  }
}
